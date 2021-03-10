FROM node:12-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html
COPY --from=react-build /app/src/firebase-config.json /usr/share/nginx/html/src/firebase-config.json

ENV PORT 8080
ENV HOST 0.0.0.0

EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d7configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"