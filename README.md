# Wallapop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

# Description

This project has been built using Angular 13, bootstrap as the main UI Library and Font-Awesome to import some icons as a Single-Page Application.

Unit Tests nor E2E Tests have been done due to time issues (Christmas holidays, having caught COVID-19...). I would have done that using JEST for the Unit Testing and Cypress for the E2E Testing.

The application runs and automatically shows you 5 items. You can filter those items using the search input at the top of the page or sort the items using the sort component placed below the header. Search would trigger by pressing the 'ENTER' key.

You can save to Favourites all items wanted by clicking the heart icon each item card has placed at its mid-right level. There's also a Favourites page, where you can route to by clicking Favourites (Desktop) or at the heart icon (Mobile) at the header. There you can see all Favourites items previously selected and remove them from there by clicking at the trash icon and confirming it in a modal that would pop up.

I also added translations. You might find it at the right side of the header. EN for English and ES for Español.

The whole application is responsive so feel free to try it on different devices and sizes.

Also the application has been deployed to a Firebase Hosting Server so you can actually display it here:

        - https://wallapop-test.firebaseapp.com
        (notice that it's running on a free plan so once reached 250Mb/downloads per day won't work anymore)

If not run `npm run serve` or `ng serve` to run it locally. By default will open port :4200 but feel free to use a custom one using --port flag.
