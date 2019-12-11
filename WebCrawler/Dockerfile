FROM ubuntu:latest

RUN apt-get update && apt-get -y install cron python3 python3-pip at
RUN pip3 install scrapy
RUN pip3 install ScrapyElasticSearch

# Copy hello-cron file to the cron.d directory
WORKDIR /root

COPY crawler-cron /etc/cron.d/crawler-cron
COPY . /root

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/crawler-cron

# Apply cron job
RUN crontab /etc/cron.d/crawler-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

ENTRYPOINT "/root/crawl.sh"
# Run the command on container startup
# CMD cron && tail -f /var/log/cron.log