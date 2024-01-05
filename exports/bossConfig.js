/* BOSS CONFIG FILE
If new bosses get added, add a new array entry with corresponding properties. 
If channels get increased or decreased, edit the channels value and recreate the placeholder messages if needed. 
Then, recreate the interaction menu on the affected boss thread(s).
*/

bossProperties = [
    //Aesperia
    { name: 'Apophis',       value: 'apophis',       channels: 26,   key: 'apophisChannel' },
    { name: 'Barbarossa',    value: 'barbarossa',    channels: 26,   key: 'barbarossaChannel' },
    { name: 'Frost Bot',     value: 'frostbot',      channels: 26,   key: 'frostbotChannel' },
    { name: 'Lucia',         value: 'lucia',         channels: 26,   key: 'luciaChannel' },
    { name: 'Robarg',        value: 'robarg',        channels: 26,   key: 'robargChannel' },
    { name: 'Sobek',         value: 'sobek',         channels: 26,   key: 'sobekChannel' },
    //AI
    { name: 'Devourer',      value: 'devourer',      channels: 2,    key: 'devourerChannel' },
    { name: 'Dragon',        value: 'dragon',        channels: 2,    key: 'dragonChannel' },
    //Vera
    { name: 'Eva',           value: 'eva',           channels: 15,    key: 'evaChannel' },
    { name: 'Magma',         value: 'magma',         channels: 15,    key: 'magmaChannel' },
    { name: 'Rudolph',       value: 'rudolph',       channels: 15,    key: 'rudolphChannel' },
    //Abyss
    { name: 'Culton',        value: 'culton',        channels: 5,    key: 'cultonChannel' },
    { name: 'Harrah',        value: 'harrah',        channels: 5,    key: 'harrahChannel' },
    //Innars
    { name: 'Haboela',       value: 'haboela',       channels: 5,   key: 'haboelaChannel' },
    { name: 'Scylla',        value: 'scylla',        channels: 5,   key: 'scyllaChannel' },
    { name: 'Nakya',         value: 'nakya',         channels: 5,   key: 'nakyaChannel' },
    //Domain Nine
    { name: 'Zhuyan',        value: 'zhuyan',        channels: 30,   key: 'zhuyanChannel' },
    { name: 'Black Crow',    value: 'blackcrow',     channels: 30,   key: 'blackcrowChannel' },
    { name: 'Taotie',        value: 'taotie',        channels: 30,   key: 'taotieChannel' },
    { name: 'Merbelle',      value: 'merbelle',      channels: 30,   key: 'merbelleChannel' },
    { name: 'Xingtian',      value: 'xingtian',      channels: 30,   key: 'xingtianChannel' },
    //{name: 'boss_name',     value: 'boss_name_lowercase',   channels: 0,  key: 'boss_nameChannel'},
];

exports.bossProperties = bossProperties
