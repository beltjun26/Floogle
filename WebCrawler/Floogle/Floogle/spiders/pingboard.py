# -*- coding: utf-8 -*-
import scrapy
import json
from scrapy.http import FormRequest, Request
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from scrapy.loader.processors import TakeFirst
from scrapy.utils.response import open_in_browser
from Floogle.items import PingboardItem


class PingboardSpider(scrapy.Spider):
    name = 'pingboard'
    allowed_domains = ['freelancer.pingboard.com']
    
    start_urls = ['https://freelancer.pingboard.com/sign_in']

    def start_requests(self):
        yield Request(
            url='https://freelancer.pingboard.com/sign_in',
            callback=self.parse_login
        )

    def parse_login(self, response):
        token = response.xpath('//*[@name="authenticity_token"]/@value').extract_first()
        return FormRequest.from_response(
            response,
            formdata={
                'authenticity_token': token,
                'user[email]': 'rabisado@freelancer.com',
                'user[password]': 'ilovesports26',
            },
            callback=self.scrape_page,
            dont_filter=True,
        )

    def scrape_page(self, response):
        return Request(
            url='https://freelancer.pingboard.com/users/directory?view_scope=users',
            callback=self.get_data_for_api_call,
        )

    def get_data_for_api_call(self, response):
        data = response.xpath('//script[@id="gonvariables"]/text()').get()
        pingboardData = json.loads(data)
        self.token = pingboardData['oauth_access_token']['token']

        return Request(
            url='https://freelancer.pingboard.com/api/v2/users?group_id=&links=&page=1&page_size=100&sort=first_name%2Clast_name',
            headers={'Authorization': 'Bearer '+self.token}
        )
        
    def parse(self, response):
        data = json.loads(response.body)
        
        for user in data['users']:
            fullname = user['first_name'] + ' ' + user['last_name']
            itemLoader = ItemLoader(item=PingboardItem(), response=response)
            itemLoader.add_value('title', fullname)
            itemLoader.add_value('content', 'View '+fullname+' profile in Pingboard, a real-time org chart software that makes it easy to build professional looking org charts')
            # itemLoader.add_xpath('content', '//div[@class="phui-document-content-view"]//div/text()')
            itemLoader.add_value('url', 'https://freelancer.pingboard.com/users/' + user['id'])

            meta = {}
            meta['id'] = user['id']
            meta['avatar_urls'] = {}
            meta['avatar_urls']['icon'] = user['avatar_urls']['icon'] if user['avatar_urls'] != None else ''
            meta['avatar_urls']['medium'] = user['avatar_urls']['medium'] if user['avatar_urls'] != None else ''
            meta['first_name'] = user['first_name']
            meta['last_name'] = user['last_name']
            meta['nickname'] = user['nickname']
            meta['email'] = user['email']
            meta['phone'] = user['phone']
            meta['job_title'] = user['job_title']
            meta['bio'] = user['bio']
            itemLoader.add_value('meta', meta)
            yield itemLoader.load_item()
            
        if(data['meta']['users']['next_href'] != None ):
            yield Request(
                url='https://freelancer.pingboard.com'+data['meta']['users']['next_href'],
                headers={'Authorization': 'Bearer '+self.token}
            )
