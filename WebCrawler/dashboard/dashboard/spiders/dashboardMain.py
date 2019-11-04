# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import FormRequest, Request
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from scrapy.loader.processors import TakeFirst
from dashboard.items import DashboardItem

class DashboardmainSpider(scrapy.Spider):
    name = 'dashboardMain'
    allowed_domains = ['dashboard.analytics.flnltd.com']
    start_urls = ['https://dashboard.analytics.flnltd.com/']
    download_delay = 1.0

    def start_requests(self):
        yield Request(
            url='https://dashboard.analytics.flnltd.com/',
            cookies={'_oauth2_proxy': 'cmFiaXNhZG9AZnJlZWxhbmNlci5jb20=|1572524632|stwKQo6RA0inkYz_CbV1WjKkRuc='},
            cb_kwargs={'title': 'Dashboard Home', 'initial_title': 'Home'}
        )

    def parse(self, response, title=None, initial_title=None):
        links = response.xpath('//div[@id="jpcsnav"]/ul//a')
        for next_page in links:
            next_page_url = response.urljoin(next_page.xpath('@href').get())
            next_page_initial_title = next_page.xpath('text()').get()
            next_page_title =  initial_title + ' - ' + next_page_initial_title

            yield response.follow(next_page_url, self.parse, cb_kwargs={'title': next_page_title, 'initial_title': next_page_initial_title})
        
        itemLoader = ItemLoader(item=DashboardItem(), response=response)
        itemLoader.add_value('title', title)
        itemLoader.add_value('content', title+' - Freelancer Dashboard - View the graph and the latest trend of our stats')
        itemLoader.add_xpath('content', '//div[@id="jpcscontent"]//span/text()')
        itemLoader.add_xpath('content', '//div[@id="jpcscontent"]//h2/text()')
        itemLoader.add_value('url', response.url)

        sub_links =  response.xpath('//div[@id="jpcssubnav"]/ul//a')
        anchor_id_links = []
        for sub_link in sub_links:
            sub_link_data = {}
            sub_link_data['url'] = response.url + sub_link.xpath('@href').get()
            sub_link_data['link_name'] = sub_link.xpath('text()').get()
            anchor_id_links.append(sub_link_data)
        itemLoader.add_value('meta', {'internal_links' : anchor_id_links})

        # itemLoader.add_xpath('meta', '//div[@class="phui-document-content-view"]//div/text()')
        yield itemLoader.load_item()
