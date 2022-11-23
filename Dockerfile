FROM ruby:3.1.2-slim-bullseye as build

WORKDIR /usr/src/app

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential \
  && bundle config set frozen true \
  && bundle config set with production \
  && bundle install --no-cache


FROM ruby:3.1.2-slim-bullseye as runtime
LABEL maintainer="nownabe <nownabe@gmail.com>"

EXPOSE 80
ENV PORT 80

RUN apt-get update \
  && apt-get install -y --no-install-recommends nasm \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd -g 61000 app \
  && useradd -g 61000 -l -M -s /bin/false -u 61000 app

USER app
WORKDIR /usr/src/app

COPY --from=build --chown=app:app /usr/local/bundle /usr/local/bundle
COPY . /usr/src/app

CMD bundle exec puma -e production -p $PORT
