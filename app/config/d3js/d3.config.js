export default ngModule => {
    require("./d3-tip.styl");
    if (angular.isDefined(window.d3)) {
        // Setting up a new locale for d3 (here for the numbers, so we can have spaces for large number. By default it's using the en-US locale)
        var myLocale = d3.locale({
            "decimal": ",",
            "thousands": " ",
            "grouping": [3],
            "currency": ["€", ""],
            "dateTime": "%a %b %e %X %Y",
            "date": "%m/%d/%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        });
        d3.format = myLocale.numberFormat;
    }
}