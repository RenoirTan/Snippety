# Snippety

This is my testing ground to try and integrate Django and some front-end framework (probably Next.js but Flask kinda counts).

## Uhh

Doesn't really work right now. The users page is fetching at least twice and isn't updating when
a new response is received.

## Install

```bash
# Manually
pip install Django djangorestframework djangorestframework-simplejwt "psycopg[binary,pool]"

# Through requirements.txt
pip install -r requirements.txt
```

## References

- [Django REST Framework](https://www.django-rest-framework.org/)
- [How to use JWT for DRF](https://www.freecodecamp.org/news/how-to-use-jwt-and-django-rest-framework-to-get-tokens/)
- [djangorestframework-simplejwt](https://github.com/jazzband/djangorestframework-simplejwt)
- [Using PostgreSQL with Django](https://djangocentral.com/using-postgresql-with-django/)
- [django-environ](https://github.com/joke2k/django-environ)
- [nextjs-django-auth-example](https://github.com/jeffroche/nextjs-django-auth-example)
