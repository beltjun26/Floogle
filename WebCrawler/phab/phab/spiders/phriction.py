# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import FormRequest, Request
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from phab.items import PhabItem
from scrapy.loader.processors import TakeFirst


class PhrictionSpider(scrapy.Spider):
    name = 'phriction'
    allowed_domains = ['phabricator.tools.flnltd.com']
    start_urls = ['https://phabricator.tools.flnltd.com', 'https://phabricator.tools.flnltd.com/w/']
    download_delay = 1.0
    

    def start_requests(self):
        yield Request(
            url='https://phabricator.tools.flnltd.com/',
            callback=self.parse_login
        )

    def parse_login(self, response):
        token = response.xpath('//*[@name="__csrf__"]/@value').extract_first()
        return FormRequest.from_response(
            response,
            formdata={
                '__csrf__': token,
                'username': 'rabisado',
                'password': 'ilovesports26',
            },
            callback=self.scrape_page,
            dont_filter=True,
        )
        
    def scrape_page(self, response):
        return Request(
            url='https://phabricator.tools.flnltd.com/w/'
        )
    
    def parse(self, response):
        for next_page in response.css('a::attr(href)').getall():
            if(next_page.startswith('/w/') and '__print__' not in next_page):
                next_page = response.urljoin(next_page)
                yield response.follow(next_page, self.parse)

        itemLoader = ItemLoader(item=PhabItem(), response=response)
        itemLoader.add_xpath('title', '//span[@class="phui-header-header"]', TakeFirst())
        itemLoader.add_xpath('content', '//div[@class="phui-document-content-view"]//text()')
        # itemLoader.add_xpath('content', '//div[@class="phui-document-content-view"]//div/text()')
        itemLoader.add_value('url', response.url)
        yield itemLoader.load_item()


