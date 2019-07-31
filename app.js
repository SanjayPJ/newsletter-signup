const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
	res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {
	const first_name = req.body.first_name
	const last_name = req.body.last_name;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
			        "FNAME": first_name,
			        "LNAME": last_name
			      }
			}
		],
		update_existing: true
	}

	const json_data = JSON.stringify(data);

	let options = {
		url: "https://usX.api.mailchimp.com/3.0/lists/",
		method: "POST",
		headers: {
			"Authorization": ""
		},
		body: json_data
	};

	request(options, function(err, response, body){
		if(response.statusCode == 200){
			res.sendFile(__dirname + "/response_html/success.html");
		}else{
			res.sendFile(__dirname + "/response_html/failure.html");
		}
	});
});

app.get('/failure', (req, res) =>{
	res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server started at port 3000');
});
