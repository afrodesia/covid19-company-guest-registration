#!/bin/sh
#$1 API URL until the /api => e.g. http://localhost/cockpit
#$2 Cockpit token
#$3 days to keep records => default is 14
url=$1
token=$2
daystokeep=14

if [ "$3" != '' ]; then  
    daystokeep=$3
fi

#delete all older than 14 days
xdaysago=`date '+"%Y-%m-%d"' -d "-$daystokeep days"`
echo $xdaysago
curl -X POST \
    -H "Cockpit-Token: $token" \
    -H "Content-Type: application/json" \
    -d '{"filter": {"checkIn": {"$lte":'$xdaysago'}}}' \
    $url/api/collections/remove/Guest