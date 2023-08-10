LOCATION=/home/ubuntu/
PROJECT=2023-internship-front
FULL_LOCATION=$LOCATION$PROJECT
sudo rm -rf $FULL_LOCATION\_*
sudo mv /tmp/build $FULL_LOCATION-new
sudo chown -R ubuntu:ubuntu $FULL_LOCATION-new
sudo mv $FULL_LOCATION $FULL_LOCATION\_$(date +"%Y%m%d%H%M")
sudo mv $FULL_LOCATION-new $FULL_LOCATION
cd $FULL_LOCATION

sudo pm2 list | grep $PROJECT
sudo yarn install
sudo yarn build
sudo pm2 delete 2023-internship-front-1 2023-internship-front-2
sudo pm2 reload ecosystem.config.js