# Setup dev environment

```
npm i
```

```
npm run prepare
```

```
npm run dev
```


### To run feature login via GHTK ID, follow these steps:

1. Update hosts file ```/etc/hosts```, add this line:

```127.0.0.1       admin.ghtklab.com```


2. Copy folder configure/ssl trong project vào thư mục cố định trên PC

3. Copy file config nginx vào thư mục cấu hình nginx 
```
cp configure/nginx/admin.ghtklab.com /etc/nginx/sites-available/
```
4. Enable config by linking it to sites-enabled folder 
```
sudo ln -s /etc/nginx/sites-available/admin.ghtklab.com /etc/nginx/sites-enabled/
```

5. Update nginx configuration:

```nginx
listen 443 ssl default_server;
listen [::]:443 ssl default_server;

ssl_certificate   ${path}/ssl/localhost.crt;
ssl_certificate_key ${path}/ssl/localhost.key;

location / {
        proxy_pass https://localhost:3000;
}

```
*Note: Thay đổi lại ${path} tương ứng đường dẫn thư mục bạn copy folder configure/ssl vào*


6. Kiểm tra xem configure nginx đã hoạt động được hay chưa bằng lệnh

```nginx -t```

Nếu kết quả như sau thì là chính xác 
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

7. Restart nginx
```
sudo service nginx restart
```

8. Restart dev server
```
npm run dev
```

9. Để tránh lỗi HMR tự động refresh lại web app thì cần bypass các https request ở localhost khi chứng chỉ SSL không hợp lệ bằng cách sau

Mở trình duyệt (ví dụ chrome) 
```chrome://flags/#allow-insecure-localhost```

Enable config sau (Allow invalid certificates for resources loaded from localhost), sau đó khởi động lại trình duyệt

*Chú ý: Cần đảm bảo config trong nginx và dev server của web app đều chạy trên cùng 1 cổng (mặc định là 3000)


Open https://admin.ghtklab.com/
