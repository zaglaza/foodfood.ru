<?php
/**
 * @package PapipuEngine
 * @author valmon, z-mode
 * @version 0.2
 * Страница ресторана, по умолчанию действие View
 */
class news_Page extends View {

    /*
     * Инициализация контроллера
    */
    public static function initController ($action) {
        // Получаем список настроений
        $moods=MD_Mood::getMoods();
        // Получаем список тэгов
        $tags=MD_Mood::getTags();

        self::$page['site']['city'] = CityPlugin::getCity();
        self::$page['content']['moods']=$moods;
        self::$page['content']['tags']=$tags;
        self::$page['header']['banner']['type'] = 'main_h';
        self::$page['header']['banner']['class'] = 'banner770';
    }
    
    /*
     * Показ одной новости
    */
    public static function viewAction ($id) {
        $content = MD_News::get($id);
        self::$page['site']['title'] = $content['title'];
        self::$page['content']['page'] = $content;
        self::showXSLT('pages/news/view');
    }

}