# WeatherApp2
OpenWeatherMap API
Description: OpenWeatherMap provides a comprehensive set of weather data and forecasts. The API allows you to access current weather conditions, forecasts, and historical data for any location on Earth. Usage: Obtain an API key by registering on the OpenWeatherMap website. Make HTTP requests to their API endpoint to get weather data for a specific location.

Yandex Maps API
Description: Yandex Maps API offers mapping and geocoding services. It allows you to integrate maps, geolocation, and route planning into your application. Usage: Obtain an API key from Yandex Map. Use the API to convert city names into geographical coordinates and display interactive maps.

Unsplash API
Description: Unsplash is a platform for high-quality, freely usable images. The Unsplash API provides programmatic access to their vast collection of photos. Usage: Create a developer account on Unsplash and register an application to obtain an API key. Use the API to dynamically fetch background images based on weather conditions. These APIs collectively enable your weather website to provide users with up-to-date weather information, display city maps, and enhance the visual experience with dynamically changing background images.

Features:

Weather Forecast Viewing:

Users can input a location and view the current weather forecast.
Weather information includes temperature, humidity, wind speed, etc.

Map View:

The application includes a map feature for visualizing weather data.
Weather information is overlaid on the map for easy interpretation.

Search History:

The application stores users' search history in a table format.
Search history displays past search queries along with their respective results.
PDF Download using jsPDF:

Users can download their search history table as a PDF document.
This functionality is enabled using the jsPDF library.
Admin Panel:

An admin panel is provided for managing users.
Admins can delete, modify, and add users as necessary.
Account Deletion Handling:

When an admin deletes a user, the deletion date and time are recorded in the system.
Upon login, the application checks the deletion date of the user's account.
If the deletion date is not null, it indicates that the account was deleted, otherwise, the account is active.

Using jsPDF:
jsPDF is a JavaScript library that allows for generation of PDF documents directly in the browser. It provides various functionalities for creating PDFs dynamically, including text formatting, image embedding, and table creation. In our application, we utilize jsPDF to enable users to download their search history table as a PDF document. This feature enhances user experience by providing a convenient way to save and share their search records.
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.2.3/jspdf.plugin.autotable.min.js"></script>


User examples for login purposes. Here they are:

Main Admin:
Username: Erzhan,
Password: admin001

Admin created by the Main Admin:
Username: TestAdmin,
Password: 161291

Regular User:
Username: TestUser,
Password: 161291

User who has been deleted by the Admin:
Username: TestDel,
Password: 161291


