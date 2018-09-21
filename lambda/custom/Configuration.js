const configuration = {

    //tables
    PARTS_TABLE: process.env.PartsTableName, //"StoryPartsTable",
    STORIES_TABLE: process.env.StoriesTableName//"StoriesTable",


    //Intents types
    NUMBER_INTENT: 1,
    STRING_INTENT: 4,

    COUNTRY_INTENT: 2,
    CITY_IN_EUROPE_INTENT: 8,
    CITY_IN_US_INTENT: 9,

    AUTHORS_INTENT: 3,

    ANIMAL_INTENT: 5,
    COLOR_INTENT: 6,
    DEVICE_INTENT:7, //monitor, AC,..

    SPORT_INTENT: 10,//basketball, fottball
    LANDMARK_INTENT: 11, //madison square
    HERO_INTENT:12, //captin america, batman

    //Last Part
    LAST_PART: 0,

    //Part type
    CHOICE_PART: 1,
    QUESTION_PART: 2
};
module.exports = configuration;
