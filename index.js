const express = require('express')
const app = express();
const axios = require('axios')
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const headers={accept:"*/*","accept-language":"en-US,en;q=0.9","content-type":"application/json","sec-ch-ua":'"Chromium";v="118", "Opera GX";v="104", "Not=A?Brand";v="99"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site",Referer:"https://www.opera.com/","Referrer-Policy":"strict-origin-when-cross-origin"};
const data = {
   partnerUserId: generateUUID()
};

app.post('/', (req, res) => {
  axios.post('https://api.discord.gx.games/v1/direct-fulfillment', data, { headers })
  .then((response) => {
    const token = response.data.token;
    res.send('https://discord.com/billing/partner-promotions/1180231712274387115/' + token)
  })
  .catch((error) => {
    res.send('Houston, we have an error: ' + error);
  });
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000)
