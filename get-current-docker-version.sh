curlResult=$(curl "https://registry.hub.docker.com/v2/repositories/nilsemil/resto-order-admin-ui/tags/?page_size=1&page=1" 2>/dev/null | jq -r '.count')
nextNumber=$((curlResult + 1))
echo v$nextNumber
