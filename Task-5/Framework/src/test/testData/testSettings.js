module.exports = {
    table: {
        numbers: [11, 22, 33, 44, 55, 66, 77, 88, 99]
    },
    generationSettings: {
        lenght : 10,
        //Please don't get under 8;
        domains : [ '.org' , '.co.uk' , '.net' , '.gov' , '.de' , '.fr' , '.nl' , '.com' , '.be' , '.jpg'],
        intrests: ['ponies', 'polo', 'dough', 'snails', 'balls', 'postits', 'faucets',
                    'enveloppes', 'cables', 'questions', 'squares','purple', 'cotton',
                    'drywall', 'closets', 'tires', 'windows', 'mullets', 'cinnamon']
    },
    expected: {
        timer : '00:00:00',
    }
}