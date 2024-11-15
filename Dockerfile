# syntax=docker/dockerfile:1.4
FROM node:18 AS base
USER root
RUN npm install -g serve
WORKDIR /project

# RUN wget -qO- https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for
RUN apt update -y && apt upgrade -y
# create new user (only root can do this) and assign owenership to newly created user
RUN groupadd -g 1001 appusr \
    && useradd -r -u 1001 -g appusr appusr \
    && mkdir /home/appusr/ \
    && chown -R appusr:appusr /home/appusr/\
    && chown -R appusr:appusr /project

# switch to new created user so that appuser will be responsible for all files and has access
USER appusr:appusr
COPY --chown=appusr:appusr ["package.json", "package-lock.json", "./"]

FROM base AS dev
RUN npm install
COPY --chown=appusr:appusr . .
CMD ["npm", "run", "serve"]

FROM base AS prod
RUN npm install
COPY --chown=appusr:appusr . .
RUN npm run build
CMD ["serve", "-s", "dist"]
