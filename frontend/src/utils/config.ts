class AppConfig {
    API_URL = 'http://localhost:3000/api/';

    // * ROUTES * //
    GET_ALL_TODO_ROUTE = this.API_URL + 'todo';
    ADD_TODO_ROUTE = this.API_URL + 'todo';
    EDIT_VACATION_ROUTE = this.API_URL + 'todo/';  //!NEED TODO ID PARAM
    DELETE_VACATION_ROUTE = this.API_URL + 'todo/';  //!NEED TODO ID PARAM

}

const config = new AppConfig();
export default config;