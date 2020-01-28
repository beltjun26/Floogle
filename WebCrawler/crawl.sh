#!/bin/bash
sleep 60
cd /root/pingboard
scrapy crawl fl-pingboard 
cd /root/phab
scrapy crawl phriction
cd dashboard
scrapy crawl dashboardMain
cron -f