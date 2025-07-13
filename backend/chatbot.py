def get_bot_response(message):
    # Tu peux améliorer ça avec NLP, BERT, OpenAI, ou règles fixes
    message = message.lower()

    if "math" in message or "aya dafali" in message:
        return " je pense que  aya est la femme de Omar mouhsine"
    elif "bonjour" in message:
        return "Bonjour 👋 ! Je suis ton assistant éducatif. Pose-moi une question."
    elif "table de multiplication" in message:
        return "2x2=4, 2x3=6, 2x4=8, ..."
    else:
        return "Je n'ai pas compris 😕. Peux-tu reformuler ?"
