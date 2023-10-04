// Rule Base approach (happy cases, based on target website and existing posts and other words)

// Can be replaced with sentiment (https://www.npmjs.com/package/sentiment) for better accuracy

function analyzeSentiment(text) {
    /**
     * (-2-) BAD -- [-2 ~ 2]Neutral -- (2+) GOOD
     */
    let sentimentScore = 0;

    for(let word of positiveWords) {
        if(text.match(word)) {
            sentimentScore++;
        }
    }

    for(let word of negativeWords){
        if(text.match(word)) {
            sentimentScore--;
        }
    }

    if(sentimentScore < -2) {
        return 'Negative'
    } else if(sentimentScore > 2) {
        return 'Positive'
    } else {
        return 'Neutral'
    }
}

var positiveWords = [
    'good', 'beautiful', 'joyful', 'rewarding', 'happiness', 'positive', 'flowers',
    'satisfaction', 'peace', 'calm', 'nature', 'beauty', 'singing', 'enjoy', 'fresh',
    'delightful', 'pleasant', 'cherish', 'embrace', 'good', 
    // internet
    'awesome', 'amazing', 'great', 'fantastic', 'excellent', 'wonderful', 'good', 'terrific', 
    'superb', 'perfect', 'fabulous', 'outstanding', 'joyful', 'happy', 'delightful', 'pleasurable', 
    'lovely', 'uplifting', 'positive', 'exciting', 'beautiful', 'pleasant', 'smile', 'fun', 'enjoyable', 
    'awesome', 'brilliant', 'best', 'praiseworthy', 'satisfying', 'glorious', 'vibrant', 'amiable', 
    'splendid', 'ideal', 'admirable', 'benevolent', 'jovial', 'kind', 'magnificent', 'sunny', 'thrilling', 
    'elegant', 'grateful', 'heartwarming', 'charming', 'innovative', 'loving', 'optimistic', 'refreshing', 
    'stunning', 'vibrant', 'wholesome'
]

var negativeWords = [
    'rot', 'harmful', 'pests', 'overwhelming', 'not-so-rosy', 'noise', 'traffic',
    'high rent', 'expensive', 'pollution', 'negative', 'chaos', 'bad', 'issues',
    'obesity', 'disease', 'diabetes', 'unhealthy', 'disaster', 'waste', 'harming',
    // internet
    'awful', 'terrible', 'horrible', 'bad', 'dreadful', 'abysmal', 'poor', 'unpleasant', 
    'disgusting', 'unhappy', 'miserable', 'sad', 'gloomy', 'depressing', 'grim', 'upsetting', 
    'annoying', 'frustrating', 'irritating', 'stressful', 'disappointing', 'hateful', 'displeasing', 
    'distressing', 'offensive', 'nasty', 'unfortunate', 'ugly', 'disheartening', 'disturbing', 'obnoxious', 
    'repugnant', 'repulsive', 'lousy', 'unsatisfactory', 'disastrous', 'wretched', 'noxious', 'dismal', 
    'sinister', 'dismaying', 'detestable', 'harmful', 'injurious', 'pessimistic', 'detrimental', 'invidious', 'despicable'
]

module.exports = analyzeSentiment;