# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item, Field
from scrapy.loader.processors import TakeFirst, MapCompose
from w3lib.html import remove_tags

def filter_content(value):
    return list(filter(lambda x: not x.startswith("\n") and len(x) > 5, value))

class PhabItem(Item):
    title = Field(
        input_processor=MapCompose(remove_tags),
        output_processor=TakeFirst()
    )
    url = Field(output_processor=TakeFirst())
    content = Field(input_processor=filter_content)
