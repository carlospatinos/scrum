#/bin/sh
#source ../.env
#heroku config:set PROP=VAL --app scrummy-caps

file=`pwd`/packages/scrum-server/.env

app=$1
stringProps="CI=false "
if [ -f "$file" ]
then
  echo "$file found."

  while IFS='=' read -r key value
  do
    if [ -z "$key" ] || [[ $key == \#* ]]
    then
        echo "Skipping empty line"
    else
        key=$(echo $key | tr '.' '_')
        # eval ${key}=\${value}
        stringProps="${stringProps} ${key}=${value}"
    fi
  done < "$file"

#   echo ${TWITTER_CONSUMER_KEY}
    heroku config:set $stringProps --app $app
else
  echo "$file not found."
fi