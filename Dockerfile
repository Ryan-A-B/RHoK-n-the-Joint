FROM ruby:2.2.3
WORKDIR /usr/src/app
COPY ./ ./
RUN bundle install
EXPOSE 9393
CMD [ "shotgun", "-o", "0.0.0.0" ]
