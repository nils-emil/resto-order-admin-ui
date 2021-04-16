version=$(sh get-next-docker-version.sh)
ng build --prod
docker build -t nilsemil/resto-order-admin-ui:$version .
docker push nilsemil/resto-order-admin-ui:$version
ssh ubuntu@13.48.27.146 << EOF
echo 'version: "2"
services:
  admin-ui-loputoo:
    container_name: admin-loputoo
    restart: always
    image: nilsemil/resto-order-admin-ui:$version
    environment:
      - WS_URL=https://loputoo-admin.tellimus.com
      - SOCKET_URL=https://loputoo-admin.tellimus.com
    ports:
      - "9501:80"
  admin-ui-demo:
    container_name: admin-demo
    restart: always
    image: nilsemil/resto-order-admin-ui:$version
    environment:
      - WS_URL=https://demo-admin.tellimus.com
      - SOCKET_URL=https://demo-admin.tellimus.com
    ports:
      - "9502:80"' > docker-compose.yml

docker-compose up -d
EOF
ssh ubuntu@13.48.27.146

