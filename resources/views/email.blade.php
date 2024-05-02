<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
</head>
<body>
    <p>Dear {{ $fname }} {{ $lname }},</p>

<p>We inform you that your credentials to access to your account are as follows:</p>

login: {{ $matricule }}<br>
password:{{ $pwd }}<br>

You can access to your account via the following link: <a href="{{ $url }}">{{ $url }}</a><br>

For any additional assistance, please do not hesitate to contact us.
</body>
</html>