LOCATION=/home/ubuntu/
PROJECT=2023-internship-front
sudo rm -rf $LOCATION$PROJECT\_*
sudo mv /tmp/build $LOCATION$PROJECT-new
sudo chown -R ubuntu:ubuntu $LOCATION$PROJECT-new
sudo mv $LOCATION$PROJECT $LOCATION$PROJECT\_$(date +"%Y%m%d%H%M")
sudo mv $LOCATION$PROJECT-new $LOCATION$PROJECT
cd $LOCATION$PROJECT

sudo pm2 list | grep $LOCATION$PROJECT
PM2_LIST_RESULT=$?
echo "PM2_LIST_RESULT diff a b result :  ${PM2_LIST_RESULT}"
if [ ${PM2_LIST_RESULT} -eq "0" ]
then
	sudo pm2 reload ecosystem.config.js
else
	sudo pm2 start ecosystem.config.js
	sudo pm2 save
fi
