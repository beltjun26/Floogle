# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field
from scrapy.loader.processors import TakeFirst, MapCompose
from w3lib.html import remove_tags



class DashboardItem(scrapy.Item):
    title = Field(output_processor=TakeFirst())
    url = Field(output_processor=TakeFirst())
    content = Field()
    meta = Field(output_processor=TakeFirst())
