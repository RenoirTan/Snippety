# Snippety

This is my testing ground to try and integrate Django and some front-end framework (probably Next.js but Flask kinda counts).

When the login button is pressed, the browser fetches the access and refresh tokens from the backend server and is instructed by the response headers to store them as cookies. When the user goes to "http://localhost:3000/users/", the page calls `getUsersList()` which tries to fetch stuff from "http://localhost:8000/users/" using `fetchProtectedJson()`. If the backend returns a 401 Unauthorized HTTP code, then `fetchProtectedJson()` will try to refresh the access token with `refreshTokens()` and try again. If it fails again, then null is returned. This allows `fetchProtectedJson()` to return early if it encounters other error codes like 500 and prevent a torrent of fetch requests.

dj-rest-auth seems to set a session id cookie even though I set it to use JWTs. If I delete the session cookie but retain the JWTs, the website still works.

Honestly it might be easier, faster and safer to just use normal session IDs instead of JWTs considering the fact that so many web pages recommend access token lifetimes of less than a minute. However, JWTs might be useful if I were to send the fetch the results from the frontend server.

## Install

Backend:

```bash
# Manually
pip install Django djangorestframework djangorestframework-simplejwt "psycopg[binary,pool]"

# Through requirements.txt
pip install -r requirements.txt
```

Frontend:

```bash
cd frontend
npm install
```

I'm using docker to containerise the postgres database so you might wanna set that up too.

## Running

```bash
# In separate terminals and in this order:
docker compose up postgres
python backend/manage.py runserver
npm --prefix ./frontend run dev
```

## References

- [Django REST Framework](https://www.django-rest-framework.org/)
- [How to use JWT for DRF](https://www.freecodecamp.org/news/how-to-use-jwt-and-django-rest-framework-to-get-tokens/)
- [djangorestframework-simplejwt](https://github.com/jazzband/djangorestframework-simplejwt)
- [Using PostgreSQL with Django](https://djangocentral.com/using-postgresql-with-django/)
- [django-environ](https://github.com/joke2k/django-environ)
- [nextjs-django-auth-example](https://github.com/jeffroche/nextjs-django-auth-example)
