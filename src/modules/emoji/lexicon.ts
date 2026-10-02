/**
 * Curated Hebrew/English → emoji lexicon for the rule-based engine.
 *
 * Each concept lists base forms. The matcher additionally strips Hebrew one-letter
 * prefixes (ו ה ב ל מ ש כ) and common plural/feminine suffixes, and applies light
 * English stemming, so inflections need not all be listed. Multi-word phrases are
 * matched before single words (longest match wins).
 *
 * `emojis[0]` is the default; later entries are alternatives used by "regenerate"
 * (the `variant` parameter). `expressive` is used by the expressive style.
 * `weight` orders concepts when a style allows only a few emojis (higher first).
 */
export interface Concept {
  id: string;
  emojis: string[];
  expressive?: string;
  he: string[];
  en: string[];
  weight: number;
}

export const CONCEPTS: Concept[] = [
  // Greetings & social
  { id: 'hello', emojis: ['👋', '🙋'], expressive: '👋😄', he: ['שלום', 'היי', 'הי', 'אהלן', 'הלו'], en: ['hello', 'hi', 'hey', 'greetings'], weight: 8 },
  { id: 'goodbye', emojis: ['👋', '🫡'], expressive: '👋🙂', he: ['להתראות', 'ביי', 'נתראה', 'נתראה מחר'], en: ['goodbye', 'bye', 'farewell'], weight: 7 },
  { id: 'thanks', emojis: ['🙏', '💐'], expressive: '🙏✨', he: ['תודה', 'תודה רבה', 'מודה', 'מודים', 'תודות'], en: ['thanks', 'thank you', 'thank', 'grateful', 'appreciate'], weight: 8 },
  { id: 'please', emojis: ['🙏', '🥺'], he: ['בבקשה', 'אנא'], en: ['please'], weight: 5 },
  { id: 'sorry', emojis: ['😔', '🙇'], he: ['סליחה', 'מצטער', 'מצטערת', 'מתנצל', 'מתנצלת'], en: ['sorry', 'apologize', 'apologies'], weight: 7 },
  { id: 'welcome', emojis: ['🤗', '🎊'], he: ['ברוך הבא', 'ברוכה הבאה', 'ברוכים הבאים'], en: ['welcome'], weight: 7 },
  { id: 'good_morning', emojis: ['🌅', '☀️'], he: ['בוקר טוב'], en: ['good morning'], weight: 8 },
  { id: 'good_night', emojis: ['🌙', '😴'], he: ['לילה טוב'], en: ['good night', 'goodnight'], weight: 8 },
  { id: 'congrats', emojis: ['🎉', '👏'], expressive: '🎉🥳', he: ['מזל טוב', 'כל הכבוד', 'ברכות', 'מברך', 'מברכת'], en: ['congratulations', 'congrats', 'well done', 'bravo'], weight: 9 },
  { id: 'birthday', emojis: ['🎂', '🎈'], expressive: '🎂🎉', he: ['יום הולדת', 'יומולדת'], en: ['birthday'], weight: 9 },
  { id: 'see_you', emojis: ['🤗', '😊'], he: ['לראות אותך', 'לראות אותכם', 'לפגוש אותך', 'לפגוש'], en: ['see you', 'meet you'], weight: 6 },
  { id: 'love', emojis: ['❤️', '🥰'], expressive: '❤️😍', he: ['אוהב', 'אוהבת', 'אוהבים', 'אהבה', 'אוהבות'], en: ['love', 'loves', 'loved'], weight: 8 },

  // Feelings
  { id: 'happy', emojis: ['😊', '😄'], expressive: '😄✨', he: ['שמח', 'שמחה', 'שמחים', 'שמחות', 'מאושר', 'מאושרת', 'כיף'], en: ['happy', 'glad', 'joy', 'fun', 'delighted'], weight: 7 },
  { id: 'sad', emojis: ['😢', '😞'], expressive: '😢💔', he: ['עצוב', 'עצובה', 'עצובים', 'עצב', 'בוכה'], en: ['sad', 'unhappy', 'cry', 'crying'], weight: 7 },
  { id: 'angry', emojis: ['😠', '😤'], he: ['כועס', 'כועסת', 'עצבני', 'עצבנית', 'כעס'], en: ['angry', 'mad', 'annoyed'], weight: 7 },
  { id: 'tired', emojis: ['😴', '🥱'], he: ['עייף', 'עייפה', 'עייפים', 'מותש'], en: ['tired', 'sleepy', 'exhausted'], weight: 6 },
  { id: 'scared', emojis: ['😨', '😱'], he: ['מפחד', 'מפחדת', 'פחד', 'מפוחד'], en: ['scared', 'afraid', 'fear'], weight: 6 },
  { id: 'excited', emojis: ['🤩', '🥳'], he: ['מתרגש', 'מתרגשת', 'נרגש', 'נרגשת', 'התרגשות'], en: ['excited', 'thrilled'], weight: 7 },
  { id: 'worried', emojis: ['😟', '😬'], he: ['דואג', 'דואגת', 'מודאג', 'דאגה'], en: ['worried', 'worry', 'anxious'], weight: 6 },
  { id: 'laugh', emojis: ['😂', '🤣'], he: ['צוחק', 'צוחקת', 'מצחיק', 'צחוק', 'חחח', 'חחחח'], en: ['laugh', 'funny', 'lol', 'haha'], weight: 6 },
  { id: 'surprised', emojis: ['😮', '😲'], he: ['מופתע', 'מופתעת', 'הפתעה', 'וואו'], en: ['surprised', 'surprise', 'wow'], weight: 6 },
  { id: 'calm', emojis: ['😌', '🧘'], he: ['רגוע', 'רגועה', 'שקט'], en: ['calm', 'relaxed', 'quiet'], weight: 4 },
  { id: 'sick', emojis: ['🤒', '🤧'], he: ['חולה', 'חולים', 'חום', 'מצונן', 'מצוננת'], en: ['sick', 'ill', 'fever', 'flu'], weight: 7 },
  { id: 'pain', emojis: ['🤕', '😣'], he: ['כואב', 'כואבת', 'כאב', 'כאבים'], en: ['pain', 'hurt', 'hurts', 'ache'], weight: 7 },
  { id: 'good', emojis: ['👍', '👌'], he: ['טוב', 'טובה', 'טובים', 'מעולה', 'מצוין', 'סבבה', 'בסדר'], en: ['good', 'great', 'ok', 'okay', 'fine', 'excellent'], weight: 4 },
  { id: 'bad', emojis: ['👎', '😕'], he: ['רע', 'רעה', 'גרוע', 'גרועה'], en: ['bad', 'terrible', 'awful'], weight: 4 },
  { id: 'beautiful', emojis: ['😍', '🌸'], he: ['יפה', 'יפים', 'יפות', 'מהמם', 'מהממת'], en: ['beautiful', 'pretty', 'lovely', 'gorgeous'], weight: 5 },

  // Needs & help
  { id: 'help', emojis: ['🆘', '🙋'], he: ['עזרה', 'לעזור', 'עוזר', 'עוזרת', 'הצילו'], en: ['help', 'assist', 'support'], weight: 8 },
  { id: 'need', emojis: ['🙋', '☝️'], he: ['צריך', 'צריכה', 'צריכים', 'זקוק', 'זקוקה'], en: ['need', 'needs'], weight: 3 },
  { id: 'question', emojis: ['❓', '🤔'], he: ['שאלה', 'שאלות', 'למה', 'מדוע', 'איך'], en: ['question', 'why', 'how'], weight: 4 },
  { id: 'where', emojis: ['📍', '🗺️'], he: ['איפה', 'היכן', 'לאן'], en: ['where'], weight: 4 },
  { id: 'think', emojis: ['🤔', '💭'], he: ['חושב', 'חושבת', 'חושבים', 'מחשבה'], en: ['think', 'thinking', 'thought'], weight: 4 },
  { id: 'yes', emojis: ['✅', '👍'], he: ['כן', 'בטח', 'בהחלט'], en: ['yes', 'sure', 'definitely'], weight: 4 },
  { id: 'wait', emojis: ['⏳', '✋'], he: ['לחכות', 'מחכה', 'חכה', 'חכי', 'רגע'], en: ['wait', 'waiting', 'moment'], weight: 4 },
  { id: 'emergency', emojis: ['🚨', '🆘'], he: ['חירום', 'דחוף', 'מסוכן', 'סכנה'], en: ['emergency', 'urgent', 'danger'], weight: 9 },
  { id: 'doctor', emojis: ['🧑‍⚕️', '🩺'], he: ['רופא', 'רופאה', 'רופאים', 'אחות', 'מרפאה'], en: ['doctor', 'nurse', 'clinic'], weight: 7 },
  { id: 'hospital', emojis: ['🏥'], he: ['בית חולים', 'בית החולים'], en: ['hospital'], weight: 8 },
  { id: 'medicine', emojis: ['💊'], he: ['תרופה', 'תרופות'], en: ['medicine', 'pill', 'pills', 'medication'], weight: 6 },
  { id: 'phone', emojis: ['📞', '📱'], he: ['טלפון', 'להתקשר', 'מתקשר', 'שיחה', 'פלאפון'], en: ['phone', 'call', 'calling'], weight: 5 },
  { id: 'message', emojis: ['💬', '✉️'], he: ['הודעה', 'הודעות', 'לכתוב', 'כותב', 'כותבת'], en: ['message', 'text', 'write', 'writing'], weight: 4 },
  { id: 'money', emojis: ['💰', '💵'], he: ['כסף', 'לשלם', 'משלם', 'תשלום', 'מחיר'], en: ['money', 'pay', 'payment', 'price', 'cost'], weight: 5 },

  // Time
  { id: 'today', emojis: ['📅'], he: ['היום'], en: ['today'], weight: 3 },
  { id: 'tomorrow', emojis: ['📅', '➡️'], he: ['מחר'], en: ['tomorrow'], weight: 3 },
  { id: 'time', emojis: ['⏰', '🕒'], he: ['שעה', 'שעות', 'זמן', 'דקה', 'דקות'], en: ['time', 'hour', 'hours', 'minute', 'minutes', 'clock'], weight: 3 },
  { id: 'morning', emojis: ['🌅'], he: ['בוקר'], en: ['morning'], weight: 3 },
  { id: 'night', emojis: ['🌙'], he: ['לילה', 'ערב'], en: ['night', 'evening', 'tonight'], weight: 3 },
  { id: 'weekend', emojis: ['🗓️', '😎'], he: ['סופש', 'סוף שבוע'], en: ['weekend'], weight: 4 },
  { id: 'shabbat', emojis: ['🕯️', '🍞'], he: ['שבת', 'שבת שלום'], en: ['shabbat', 'sabbath'], weight: 8 },
  { id: 'holiday', emojis: ['🎊', '✨'], he: ['חג', 'חג שמח', 'חגים'], en: ['holiday', 'holidays'], weight: 7 },
  { id: 'late', emojis: ['⏰', '🏃'], he: ['מאחר', 'מאחרת', 'איחור', 'מאוחר'], en: ['late'], weight: 5 },

  // Places & transport
  { id: 'home', emojis: ['🏠', '🏡'], he: ['בית', 'הביתה', 'דירה'], en: ['home', 'house'], weight: 5 },
  { id: 'school', emojis: ['🏫', '🎒'], he: ['בית ספר', 'ביה"ס', 'כיתה', 'גן'], en: ['school', 'class', 'kindergarten'], weight: 6 },
  { id: 'work', emojis: ['💼', '🏢'], he: ['עבודה', 'עובד', 'עובדת', 'משרד'], en: ['work', 'job', 'office', 'working'], weight: 5 },
  { id: 'bus', emojis: ['🚌'], he: ['אוטובוס', 'אוטובוסים', 'תחנת האוטובוס', 'תחנה'], en: ['bus', 'station', 'stop'], weight: 6 },
  { id: 'car', emojis: ['🚗', '🚙'], he: ['רכב', 'מכונית', 'אוטו', 'נוסע', 'נוסעת', 'נסיעה'], en: ['car', 'drive', 'driving', 'ride'], weight: 5 },
  { id: 'train', emojis: ['🚆'], he: ['רכבת'], en: ['train'], weight: 6 },
  { id: 'plane', emojis: ['✈️'], he: ['טיסה', 'מטוס', 'שדה תעופה', 'טס', 'טסה'], en: ['flight', 'plane', 'airport', 'fly'], weight: 6 },
  { id: 'trip', emojis: ['🧳', '🗺️'], he: ['טיול', 'חופשה', 'מטיילים'], en: ['trip', 'travel', 'vacation'], weight: 6 },
  { id: 'beach', emojis: ['🏖️', '🌊'], he: ['ים', 'חוף'], en: ['beach', 'sea', 'ocean'], weight: 6 },
  { id: 'shop', emojis: ['🛒', '🛍️'], he: ['קניות', 'סופר', 'חנות', 'לקנות', 'קונה'], en: ['shopping', 'shop', 'store', 'buy', 'supermarket'], weight: 5 },

  // Food & drink
  { id: 'food', emojis: ['🍽️', '😋'], he: ['אוכל', 'לאכול', 'אוכלים', 'ארוחה', 'רעב', 'רעבה'], en: ['food', 'eat', 'eating', 'meal', 'hungry'], weight: 5 },
  { id: 'coffee', emojis: ['☕'], he: ['קפה'], en: ['coffee'], weight: 6 },
  { id: 'tea', emojis: ['🍵'], he: ['תה'], en: ['tea'], weight: 6 },
  { id: 'water', emojis: ['💧', '🚰'], he: ['מים', 'צמא', 'צמאה', 'לשתות'], en: ['water', 'thirsty', 'drink'], weight: 5 },
  { id: 'pizza', emojis: ['🍕'], he: ['פיצה'], en: ['pizza'], weight: 6 },
  { id: 'cake', emojis: ['🍰', '🧁'], he: ['עוגה', 'עוגות', 'עוגיות'], en: ['cake', 'cookies', 'dessert'], weight: 6 },
  { id: 'breakfast', emojis: ['🥐', '🍳'], he: ['ארוחת בוקר'], en: ['breakfast'], weight: 6 },
  { id: 'fruit', emojis: ['🍎', '🍉'], he: ['פרי', 'פירות', 'תפוח', 'אבטיח'], en: ['fruit', 'apple', 'watermelon'], weight: 5 },

  // People & family
  { id: 'family', emojis: ['👨‍👩‍👧‍👦', '🏡'], he: ['משפחה', 'משפחות'], en: ['family'], weight: 6 },
  { id: 'friend', emojis: ['🤝', '🧑‍🤝‍🧑'], he: ['חבר', 'חברה', 'חברים', 'חברות'], en: ['friend', 'friends', 'buddy'], weight: 5 },
  { id: 'baby', emojis: ['👶', '🍼'], he: ['תינוק', 'תינוקת', 'תינוקות'], en: ['baby'], weight: 6 },
  { id: 'child', emojis: ['🧒', '👧'], he: ['ילד', 'ילדה', 'ילדים', 'ילדות'], en: ['child', 'kid', 'kids', 'children'], weight: 5 },
  { id: 'mother', emojis: ['👩', '🤱'], he: ['אמא', 'אימא'], en: ['mom', 'mother', 'mum'], weight: 5 },
  { id: 'father', emojis: ['👨'], he: ['אבא'], en: ['dad', 'father'], weight: 5 },
  { id: 'grandparent', emojis: ['👵', '👴'], he: ['סבתא', 'סבא'], en: ['grandma', 'grandpa', 'grandmother', 'grandfather'], weight: 5 },
  { id: 'teacher', emojis: ['🧑‍🏫'], he: ['מורה', 'מורים', 'מורות'], en: ['teacher', 'teachers'], weight: 5 },

  // Nature & weather
  { id: 'sun', emojis: ['☀️', '🌞'], he: ['שמש', 'שמשי', 'חם', 'חמה'], en: ['sun', 'sunny', 'hot'], weight: 4 },
  { id: 'rain', emojis: ['🌧️', '☔'], he: ['גשם', 'גשום', 'יורד גשם'], en: ['rain', 'rainy', 'raining'], weight: 5 },
  { id: 'cold', emojis: ['🥶', '❄️'], he: ['קר', 'קרה', 'שלג', 'קור'], en: ['cold', 'snow', 'freezing'], weight: 5 },
  { id: 'flower', emojis: ['🌷', '💐'], he: ['פרח', 'פרחים', 'זר פרחים'], en: ['flower', 'flowers', 'bouquet'], weight: 5 },
  { id: 'tree', emojis: ['🌳'], he: ['עץ', 'עצים'], en: ['tree', 'trees'], weight: 4 },
  { id: 'dog', emojis: ['🐶', '🐕'], he: ['כלב', 'כלבה', 'כלבים'], en: ['dog', 'dogs', 'puppy'], weight: 6 },
  { id: 'cat', emojis: ['🐱', '🐈'], he: ['חתול', 'חתולה', 'חתולים'], en: ['cat', 'cats', 'kitten'], weight: 6 },

  // Activities & things
  { id: 'music', emojis: ['🎵', '🎶'], he: ['מוזיקה', 'שיר', 'שירים', 'לשיר'], en: ['music', 'song', 'sing', 'singing'], weight: 5 },
  { id: 'book', emojis: ['📚', '📖'], he: ['ספר', 'ספרים', 'לקרוא', 'קורא', 'קוראת'], en: ['book', 'books', 'read', 'reading'], weight: 5 },
  { id: 'study', emojis: ['📝', '🎓'], he: ['ללמוד', 'לומד', 'לומדת', 'מבחן', 'שיעורים'], en: ['study', 'studying', 'exam', 'test', 'homework'], weight: 5 },
  { id: 'sport', emojis: ['⚽', '🏃'], he: ['כדורגל', 'ספורט', 'לרוץ', 'ריצה', 'אימון'], en: ['football', 'soccer', 'sport', 'run', 'running', 'workout'], weight: 5 },
  { id: 'sleep', emojis: ['😴', '🛏️'], he: ['לישון', 'שינה', 'נרדם', 'נרדמת'], en: ['sleep', 'sleeping', 'bed'], weight: 5 },
  { id: 'gift', emojis: ['🎁'], he: ['מתנה', 'מתנות'], en: ['gift', 'present'], weight: 6 },
  { id: 'party', emojis: ['🎉', '🥳'], he: ['מסיבה', 'חגיגה', 'לחגוג'], en: ['party', 'celebrate', 'celebration'], weight: 7 },
  { id: 'photo', emojis: ['📸'], he: ['תמונה', 'תמונות', 'צילום'], en: ['photo', 'picture', 'pictures'], weight: 5 },
  { id: 'computer', emojis: ['💻'], he: ['מחשב', 'לפטופ'], en: ['computer', 'laptop'], weight: 5 },
  { id: 'idea', emojis: ['💡'], he: ['רעיון', 'רעיונות'], en: ['idea', 'ideas'], weight: 6 },
  { id: 'success', emojis: ['🏆', '💪'], he: ['הצלחה', 'הצלחתי', 'ניצחון', 'בהצלחה'], en: ['success', 'win', 'won', 'good luck'], weight: 7 },
  { id: 'strong', emojis: ['💪'], he: ['חזק', 'חזקה', 'כוח'], en: ['strong', 'strength'], weight: 5 },
  { id: 'peace', emojis: ['🕊️', '☮️'], he: ['שלום עולמי', 'שלווה'], en: ['peace'], weight: 5 },
  { id: 'fire', emojis: ['🔥'], he: ['אש', 'שריפה', 'לוהט'], en: ['fire', 'lit'], weight: 5 },
  { id: 'star', emojis: ['⭐', '🌟'], he: ['כוכב', 'כוכבים'], en: ['star', 'stars'], weight: 4 },
  { id: 'heart', emojis: ['❤️'], he: ['לב', 'לבבות'], en: ['heart', 'hearts'], weight: 6 },
  { id: 'sign_language', emojis: ['🤟', '🧏'], he: ['שפת סימנים', 'חירש', 'חירשת', 'חירשים', 'כבד שמיעה', 'כבדת שמיעה'], en: ['sign language', 'deaf', 'hard of hearing'], weight: 8 },

  // Greetings (extension)
  { id: 'good_evening', emojis: ['🌆', '🌇'], he: ['ערב טוב'], en: ['good evening'], weight: 8 },
  { id: 'good_afternoon', emojis: ['☀️', '🌤️'], he: ['צהריים טובים'], en: ['good afternoon'], weight: 8 },
  { id: 'how_are_you', emojis: ['🙂', '👋'], he: ['מה שלומך', 'מה שלומכם', 'מה נשמע', 'מה העניינים'], en: ['how are you'], weight: 7 },
  { id: 'nice_to_meet', emojis: ['🤝', '😊'], he: ['נעים מאוד', 'נעים להכיר'], en: ['nice to meet you'], weight: 7 },
  { id: 'perfect', emojis: ['👌', '💯'], he: ['מושלם', 'מושלמת', 'אחלה', 'פצצה'], en: ['perfect', 'awesome', 'amazing'], weight: 6 },
  { id: 'correct', emojis: ['✔️', '✅'], he: ['נכון', 'צודק', 'צודקת'], en: ['correct', 'right'], weight: 4 },
  { id: 'mistake', emojis: ['❌', '🙊'], he: ['טעות', 'טעיתי'], en: ['mistake', 'wrong'], weight: 5 },
  { id: 'forbidden', emojis: ['🚫', '⛔'], he: ['אסור', 'אסורה'], en: ['forbidden', 'not allowed'], weight: 6 },
  { id: 'important', emojis: ['❗', '⚠️'], he: ['חשוב', 'חשובה', 'שימו לב'], en: ['important', 'attention'], weight: 6 },
  { id: 'careful', emojis: ['⚠️', '🛑'], he: ['זהירות', 'להיזהר', 'תיזהר', 'תיזהרי'], en: ['careful', 'caution', 'warning'], weight: 7 },
  { id: 'secret', emojis: ['🤫', '🔒'], he: ['סוד', 'סודות'], en: ['secret'], weight: 5 },
  { id: 'fast', emojis: ['⚡', '🏃'], he: ['מהר', 'מהירה', 'מהיר', 'בדחיפות'], en: ['fast', 'quick', 'quickly', 'hurry'], weight: 4 },
  { id: 'slow', emojis: ['🐢', '🐌'], he: ['לאט', 'איטי', 'איטית'], en: ['slow', 'slowly'], weight: 4 },
  { id: 'week', emojis: ['🗓️', '📅'], he: ['שבוע', 'השבוע', 'שבועות הבאים'], en: ['week'], weight: 3 },
  { id: 'month', emojis: ['🗓️'], he: ['חודש', 'החודש'], en: ['month'], weight: 3 },
  { id: 'now', emojis: ['⏰', '👉'], he: ['עכשיו', 'כרגע', 'מיד'], en: ['now', 'right now', 'immediately'], weight: 3 },

  // Colors
  { id: 'red', emojis: ['🔴', '❤️'], he: ['אדום', 'אדומה', 'אדומים'], en: ['red'], weight: 5 },
  { id: 'blue', emojis: ['🔵', '💙'], he: ['כחול', 'כחולה', 'כחולים'], en: ['blue'], weight: 5 },
  { id: 'green', emojis: ['🟢', '💚'], he: ['ירוק', 'ירוקה', 'ירוקים'], en: ['green'], weight: 5 },
  { id: 'yellow', emojis: ['🟡', '💛'], he: ['צהוב', 'צהובה', 'צהובים'], en: ['yellow'], weight: 5 },
  { id: 'orange_color', emojis: ['🟠', '🧡'], he: ['כתום', 'כתומה'], en: ['orange'], weight: 5 },
  { id: 'purple', emojis: ['🟣', '💜'], he: ['סגול', 'סגולה'], en: ['purple'], weight: 5 },
  { id: 'black', emojis: ['⚫', '🖤'], he: ['שחור', 'שחורה'], en: ['black'], weight: 5 },
  { id: 'white', emojis: ['⚪', '🤍'], he: ['לבן', 'לבנה'], en: ['white'], weight: 5 },
  { id: 'rainbow', emojis: ['🌈'], he: ['קשת', 'קשת בענן', 'צבעוני', 'צבעונית'], en: ['rainbow', 'colorful'], weight: 6 },

  // Food & drink (extension)
  { id: 'bread', emojis: ['🍞', '🥖'], he: ['לחם', 'פיתה', 'חלה', 'חלות'], en: ['bread', 'pita', 'challah'], weight: 6 },
  { id: 'milk', emojis: ['🥛'], he: ['חלב'], en: ['milk'], weight: 6 },
  { id: 'egg', emojis: ['🥚', '🍳'], he: ['ביצה', 'ביצים', 'חביתה'], en: ['egg', 'eggs', 'omelette'], weight: 6 },
  { id: 'cheese', emojis: ['🧀'], he: ['גבינה', 'גבינות'], en: ['cheese'], weight: 6 },
  { id: 'chicken', emojis: ['🍗'], he: ['עוף', 'שניצל'], en: ['chicken', 'schnitzel'], weight: 6 },
  { id: 'fish', emojis: ['🐟', '🎣'], he: ['דג', 'דגים'], en: ['fish'], weight: 6 },
  { id: 'salad', emojis: ['🥗', '🥒'], he: ['סלט', 'ירקות', 'ירק', 'מלפפון', 'עגבנייה'], en: ['salad', 'vegetables', 'cucumber', 'tomato'], weight: 5 },
  { id: 'soup', emojis: ['🍲'], he: ['מרק'], en: ['soup'], weight: 6 },
  { id: 'falafel', emojis: ['🧆'], he: ['פלאפל', 'חומוס'], en: ['falafel', 'hummus'], weight: 7 },
  { id: 'sandwich', emojis: ['🥪'], he: ['כריך', 'סנדוויץ׳', 'סנדוויץ'], en: ['sandwich'], weight: 6 },
  { id: 'ice_cream', emojis: ['🍦', '🍨'], he: ['גלידה', 'ארטיק'], en: ['ice cream'], weight: 7 },
  { id: 'chocolate', emojis: ['🍫', '🍬'], he: ['שוקולד', 'ממתק', 'ממתקים'], en: ['chocolate', 'candy', 'sweets'], weight: 6 },
  { id: 'banana', emojis: ['🍌'], he: ['בננה', 'בננות'], en: ['banana'], weight: 6 },
  { id: 'orange_fruit', emojis: ['🍊'], he: ['תפוז', 'תפוזים', 'קלמנטינה'], en: ['orange (fruit)', 'tangerine'], weight: 6 },
  { id: 'grapes', emojis: ['🍇'], he: ['ענבים', 'ענב'], en: ['grapes'], weight: 6 },
  { id: 'strawberry', emojis: ['🍓'], he: ['תות', 'תותים'], en: ['strawberry', 'strawberries'], weight: 6 },
  { id: 'lunch_dinner', emojis: ['🍽️', '🍴'], he: ['ארוחת צהריים', 'ארוחת ערב', 'מסעדה'], en: ['lunch', 'dinner', 'restaurant'], weight: 7 },
  { id: 'cooking', emojis: ['🍳', '👨‍🍳'], he: ['לבשל', 'מבשל', 'מבשלת', 'בישול', 'מתכון'], en: ['cook', 'cooking', 'recipe'], weight: 6 },

  // Clothing
  { id: 'shirt', emojis: ['👕'], he: ['חולצה', 'חולצות', 'בגדים', 'בגד'], en: ['shirt', 'clothes'], weight: 5 },
  { id: 'pants', emojis: ['👖'], he: ['מכנסיים', 'ג׳ינס'], en: ['pants', 'trousers', 'jeans'], weight: 5 },
  { id: 'shoes', emojis: ['👟', '👞'], he: ['נעליים', 'נעל', 'סנדלים'], en: ['shoes', 'sneakers', 'sandals'], weight: 5 },
  { id: 'coat', emojis: ['🧥'], he: ['מעיל', 'ז׳קט'], en: ['coat', 'jacket'], weight: 5 },
  { id: 'hat', emojis: ['🧢', '🎩'], he: ['כובע', 'כובעים'], en: ['hat', 'cap'], weight: 5 },
  { id: 'glasses', emojis: ['👓'], he: ['משקפיים'], en: ['glasses'], weight: 6 },

  // Home & objects
  { id: 'key', emojis: ['🔑'], he: ['מפתח', 'מפתחות'], en: ['key', 'keys'], weight: 6 },
  { id: 'door', emojis: ['🚪'], he: ['דלת', 'דלתות'], en: ['door'], weight: 5 },
  { id: 'chair', emojis: ['🪑'], he: ['כיסא', 'כסא', 'כיסאות'], en: ['chair'], weight: 5 },
  { id: 'tv', emojis: ['📺'], he: ['טלוויזיה', 'סדרה'], en: ['tv', 'television', 'series'], weight: 6 },
  { id: 'movie', emojis: ['🎬', '🍿'], he: ['סרט', 'סרטים', 'קולנוע'], en: ['movie', 'film', 'cinema'], weight: 6 },
  { id: 'watch', emojis: ['⌚', '⏱️'], he: ['שעון'], en: ['watch', 'clock'], weight: 5 },
  { id: 'cleaning', emojis: ['🧹', '🧽'], he: ['לנקות', 'מנקה', 'ניקיון', 'ניקיונות'], en: ['clean', 'cleaning'], weight: 5 },
  { id: 'laundry', emojis: ['🧺'], he: ['כביסה', 'כביסות'], en: ['laundry'], weight: 5 },
  { id: 'camera', emojis: ['📷'], he: ['מצלמה'], en: ['camera'], weight: 5 },
  { id: 'internet', emojis: ['🌐', '📶'], he: ['אינטרנט', 'אתר', 'וויפיי', 'ווי פיי'], en: ['internet', 'website', 'wifi'], weight: 5 },
  { id: 'password', emojis: ['🔒', '🔐'], he: ['סיסמה', 'סיסמא'], en: ['password'], weight: 5 },
  { id: 'email', emojis: ['📧', '✉️'], he: ['אימייל', 'מייל', 'דואר אלקטרוני'], en: ['email', 'e-mail'], weight: 6 },
  { id: 'letter_post', emojis: ['✉️', '📮'], he: ['מכתב', 'מכתבים', 'דואר'], en: ['letter', 'post', 'mail'], weight: 5 },
  { id: 'video_call', emojis: ['📹', '🤳'], he: ['שיחת וידאו', 'וידאו'], en: ['video call', 'video'], weight: 7 },

  // Places & transport (extension)
  { id: 'taxi', emojis: ['🚕'], he: ['מונית', 'מוניות'], en: ['taxi', 'cab'], weight: 6 },
  { id: 'bicycle', emojis: ['🚲'], he: ['אופניים', 'אופנוע'], en: ['bike', 'bicycle', 'motorcycle'], weight: 6 },
  { id: 'walk', emojis: ['🚶', '👣'], he: ['ללכת ברגל', 'הליכה', 'טיול רגלי'], en: ['walk', 'walking'], weight: 5 },
  { id: 'swim', emojis: ['🏊', '🌊'], he: ['לשחות', 'שוחה', 'שחייה', 'בריכה'], en: ['swim', 'swimming', 'pool'], weight: 6 },
  { id: 'bank', emojis: ['🏦'], he: ['בנק'], en: ['bank'], weight: 6 },
  { id: 'hotel', emojis: ['🏨'], he: ['מלון', 'בית מלון'], en: ['hotel'], weight: 6 },
  { id: 'library', emojis: ['📚', '🏛️'], he: ['ספרייה'], en: ['library'], weight: 6 },
  { id: 'municipality', emojis: ['🏛️'], he: ['עירייה', 'מועצה', 'ביטוח לאומי'], en: ['municipality', 'city hall'], weight: 6 },
  { id: 'synagogue', emojis: ['🕍'], he: ['בית כנסת', 'בית הכנסת', 'בתי כנסת'], en: ['synagogue'], weight: 8 },
  { id: 'police', emojis: ['👮', '🚓'], he: ['משטרה', 'שוטר', 'שוטרת', 'שוטרים'], en: ['police', 'police officer'], weight: 8 },
  { id: 'ambulance', emojis: ['🚑'], he: ['אמבולנס', 'מד״א', 'מדא'], en: ['ambulance'], weight: 9 },
  { id: 'firefighters', emojis: ['🚒', '🧑‍🚒'], he: ['כבאים', 'כבאי', 'כבאית', 'מכבי אש'], en: ['firefighters', 'fire truck'], weight: 9 },
  { id: 'accident', emojis: ['💥', '🚨'], he: ['תאונה', 'תאונת דרכים'], en: ['accident', 'crash'], weight: 8 },
  { id: 'pharmacy', emojis: ['💊', '🏪'], he: ['בית מרקחת', 'סופר פארם'], en: ['pharmacy'], weight: 7 },
  { id: 'dentist', emojis: ['🦷', '🪥'], he: ['רופא שיניים', 'שיניים', 'שן'], en: ['dentist', 'tooth', 'teeth'], weight: 7 },
  { id: 'appointment', emojis: ['📋', '🗓️'], he: ['תור', 'תורים', 'פגישה'], en: ['appointment', 'meeting'], weight: 5 },

  // Body & accessibility
  { id: 'hand', emojis: ['✋', '🤚'], he: ['יד', 'ידיים'], en: ['hand', 'hands'], weight: 4 },
  { id: 'eyes', emojis: ['👀', '👁️'], he: ['עין', 'עיניים'], en: ['eye', 'eyes'], weight: 4 },
  { id: 'ear', emojis: ['👂'], he: ['אוזן', 'אוזניים'], en: ['ear', 'ears'], weight: 4 },
  { id: 'hearing_aid', emojis: ['🦻'], he: ['מכשיר שמיעה', 'שתל שבלול'], en: ['hearing aid', 'cochlear implant'], weight: 8 },
  { id: 'interpreter', emojis: ['🧏', '🗣️'], he: ['מתורגמן', 'מתורגמנית', 'תרגום', 'לתרגם'], en: ['interpreter', 'translation', 'translate'], weight: 7 },
  { id: 'wheelchair', emojis: ['♿'], he: ['כיסא גלגלים', 'נגישות', 'נגיש'], en: ['wheelchair', 'accessibility', 'accessible'], weight: 7 },

  // Religion & holidays
  { id: 'prayer', emojis: ['🙏', '📖'], he: ['תפילה', 'להתפלל', 'מתפלל', 'מתפללת'], en: ['prayer', 'pray'], weight: 7 },
  { id: 'torah', emojis: ['📜'], he: ['תורה', 'ספר תורה'], en: ['torah'], weight: 7 },
  { id: 'candles', emojis: ['🕯️'], he: ['נרות', 'נר', 'הדלקת נרות'], en: ['candles', 'candle'], weight: 6 },
  { id: 'hanukkah', emojis: ['🕎', '🍩'], he: ['חנוכה', 'חנוכייה', 'סופגנייה', 'סופגניות'], en: ['hanukkah', 'menorah'], weight: 9 },
  { id: 'purim', emojis: ['🎭', '🎁'], he: ['פורים', 'משלוח מנות', 'משלוחי מנות', 'מגילה'], en: ['purim'], weight: 9 },
  { id: 'pesach', emojis: ['🫓', '🍽️'], he: ['פסח', 'מצה', 'מצות', 'ליל הסדר', 'סדר פסח'], en: ['passover', 'pesach', 'matzah', 'seder'], weight: 9 },
  { id: 'sukkot', emojis: ['🌿', '🍋'], he: ['סוכות', 'סוכה', 'ארבעת המינים', 'לולב'], en: ['sukkot', 'sukkah'], weight: 9 },
  { id: 'rosh_hashana', emojis: ['🍎', '🍯'], he: ['ראש השנה', 'שנה טובה', 'שנה טובה ומתוקה'], en: ['rosh hashana', 'happy new year'], weight: 9 },
  { id: 'yom_kippur', emojis: ['🕊️', '🙏'], he: ['יום כיפור', 'יום הכיפורים', 'גמר חתימה טובה', 'צום קל'], en: ['yom kippur'], weight: 9 },
  { id: 'shavuot', emojis: ['🌾', '🧀'], he: ['שבועות', 'חג השבועות', 'מתן תורה'], en: ['shavuot'], weight: 9 },

  // Nature & animals (extension)
  { id: 'wind', emojis: ['💨', '🌬️'], he: ['רוח', 'רוחות', 'סופה'], en: ['wind', 'windy', 'storm'], weight: 5 },
  { id: 'cloud', emojis: ['☁️', '⛅'], he: ['ענן', 'עננים', 'מעונן'], en: ['cloud', 'cloudy'], weight: 5 },
  { id: 'thunder', emojis: ['⛈️', '⚡'], he: ['ברק', 'ברקים', 'רעם', 'סערה'], en: ['thunder', 'lightning', 'thunderstorm'], weight: 6 },
  { id: 'moon', emojis: ['🌙', '🌕'], he: ['ירח', 'ירחים'], en: ['moon'], weight: 5 },
  { id: 'horse', emojis: ['🐴'], he: ['סוס', 'סוסים'], en: ['horse'], weight: 6 },
  { id: 'cow', emojis: ['🐄'], he: ['פרה', 'פרות'], en: ['cow'], weight: 6 },
  { id: 'bird', emojis: ['🐦', '🕊️'], he: ['ציפור', 'ציפורים', 'יונה'], en: ['bird', 'dove'], weight: 6 },
  { id: 'butterfly', emojis: ['🦋'], he: ['פרפר', 'פרפרים'], en: ['butterfly'], weight: 6 },
  { id: 'bee', emojis: ['🐝', '🍯'], he: ['דבורה', 'דבורים', 'דבש'], en: ['bee', 'honey'], weight: 6 },
  { id: 'lion', emojis: ['🦁'], he: ['אריה', 'אריות'], en: ['lion'], weight: 6 },
  { id: 'rabbit', emojis: ['🐰'], he: ['ארנב', 'ארנבון', 'ארנבת'], en: ['rabbit', 'bunny'], weight: 6 },

  // Activities & feelings (extension)
  { id: 'painting', emojis: ['🎨', '🖌️'], he: ['לצייר', 'ציור', 'ציורים', 'צובע'], en: ['paint', 'painting', 'draw', 'drawing'], weight: 6 },
  { id: 'games', emojis: ['🎲', '🧩'], he: ['משחק', 'משחקים', 'לשחק', 'פאזל'], en: ['game', 'games', 'play', 'puzzle'], weight: 5 },
  { id: 'confused', emojis: ['😕', '🤷'], he: ['מבולבל', 'מבולבלת', 'בלבול'], en: ['confused'], weight: 7 },
  { id: 'bored', emojis: ['😐', '🥱'], he: ['משועמם', 'משועממת', 'משעמם', 'שעמום'], en: ['bored', 'boring'], weight: 6 },
  { id: 'hungry', emojis: ['😋', '🍽️'], he: ['רעב', 'רעבה', 'רעבים'], en: ['hungry'], weight: 7 },
  { id: 'hug', emojis: ['🤗', '🫂'], he: ['חיבוק', 'חיבוקים', 'מחבק', 'מחבקת'], en: ['hug', 'hugs'], weight: 7 },
  { id: 'proud', emojis: ['🏅', '👏'], he: ['גאה', 'גאים', 'גאווה'], en: ['proud', 'pride'], weight: 6 },
  { id: 'lonely', emojis: ['😔'], he: ['בודד', 'בודדה', 'לבד'], en: ['lonely', 'alone'], weight: 6 },
  { id: 'miss_you', emojis: ['🥺', '💭'], he: ['מתגעגע', 'מתגעגעת', 'געגועים', 'מתגעגעים'], en: ['miss you', 'missing'], weight: 7 },
  { id: 'graduation', emojis: ['🎓', '📜'], he: ['תעודה', 'סיום לימודים', 'בגרות', 'תואר'], en: ['graduation', 'diploma', 'degree'], weight: 7 },
];
