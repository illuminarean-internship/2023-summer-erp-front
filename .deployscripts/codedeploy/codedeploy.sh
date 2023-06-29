PATH=/home/ubuntu/
PROJECT=2023-internship-front
sudo rm -rf $PATH$PROJECT\_*
sudo mv /tmp/build $PATH$PROJECT-new
sudo chown -R ubuntu:ubuntu $PATH$PROJECT-new
sudo mv $PATH$PROJECT $PROJECT\_$(date +"%Y%m%d%H%M")
sudo mv $PATH$PROJECT-new $PROJECT

pm2 list | grep $PROJECT
PM2_LIST_RESULT=$?
echo "PM2_LIST_RESULT diff a b result :  ${PM2_LIST_RESULT}"
if [ ${PM2_LIST_RESULT} -eq "0" ]
then
	pm2 reload ecosystem.config.js
else
	pm2 start ecosystem.config.js
	pm2 save
fi
