export default {
  en_US: {
    Answer: {
      Noun: "Answer (noun)",
      Verb: "Answer (verb)",
    },
    "Hello %{ name }": "Hello %{ name }",
    May: "May",
    Pending: "Pending",
    "%{ carCount } car": ["1 car", "%{ carCount } cars"],
    "%{ carCount } car (noun)": {
      Noun: ["%{ carCount } car (noun)", "%{ carCount } cars (noun)"],
    },
    "%{ carCount } car (verb)": {
      Verb: ["%{ carCount } car (verb)", "%{ carCount } cars (verb)"],
    },
    "%{ carCount } car (multiple contexts)": {
      "": ["1 car", "%{ carCount } cars"],
      Context: ["1 car with context", "%{ carCount } cars with context"],
    },
    Object: {
      "": "Object",
      Context: "Object with context",
    },

    "%{ orangeCount } orange": ["", "%{ orangeCount } oranges"],
    "%{ appleCount } apple": ["1 apple", ""],
  },
  fr: {
    Answer: {
      Noun: "Réponse (nom)",
      Verb: "Réponse (verbe)",
    },
    "Hello %{ name }": "Bonjour %{ name }",
    May: "Pourrait",
    Pending: "En cours",
    "%{ carCount } car": ["1 véhicule", "%{ carCount } véhicules"],
    "%{ carCount } car (noun)": {
      Noun: ["%{ carCount } véhicule (nom)", "%{ carCount } véhicules (nom)"],
    },
    "%{ carCount } car (verb)": {
      Verb: ["%{ carCount } véhicule (verbe)", "%{ carCount } véhicules (verbe)"],
    },
    "%{ carCount } car (multiple contexts)": {
      "": ["1 véhicule", "%{ carCount } véhicules"],
      Context: ["1 véhicule avec contexte", "%{ carCount } véhicules avec contexte"],
    },
    Object: {
      "": "Objet",
      Context: "Objet avec contexte",
    },
  },
};
