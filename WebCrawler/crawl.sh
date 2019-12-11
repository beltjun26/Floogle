#!/bin/bash
touch testFiles
sleep 60
cd /root/pingboard
scrapy crawl fl-pingboard 
cd /root/phab
scrapy crawl phriction
# ( cd dashboard ; nohup scrapy crawl dashboardMain & )
cron -f