# App
export NODE_ENV=development
export PORT=8888

# Mongodb URI
# export MONGO_URI="mongodb+srv://minhchiu:Minh.it.01@cluster0.xsf7s.mongodb.net/devcamper_api?retryWrites=true&w=majority"
export MONGO_URI="mongodb://localhost/node-api"

# JWT
# JWT secret key
export JWT_SECRET=JWTSecretKey
export JWT_EXPIRE=30d
export JWT_COOKIE_EXPIRE=30
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
# Number of minutes after which a reset password token expires
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Number of minutes after which a verify email token expires
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
export SMTP_HOST=smpt.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=minhch.vn@gmail.com
export SMTP_PASSWORD=Minh.it.01
export EMAIL_FROM=minhch.vn@gmail.com

# Geocoder
export GEOCODER_PROVIDER=mapquest
export GEOCODER_API_KEY=sAhgeXxzIqQoIMwGwGynvLtmbiUhBbCx
