class HomeController {
    showHome() {
        $('#search-field').val('');
        $('#container').html('')
        }
}

const homeController = new HomeController();
export default homeController;