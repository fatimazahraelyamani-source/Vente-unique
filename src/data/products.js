// Prototype fixtures reconstructed from the supplied design; not verified product specifications.
export const hopeya = {
  isMock: true,
  installationGuide: {
    title: 'Ce produit convient-il chez vous ?',
    subtitle: 'Anticipez sa livraison, vérifiez vos dimensions et préparez son montage.',
    delivery: {
      title: 'Les colis passeront-ils chez vous ?',
      intro: 'Assurez-vous que les colis pourront être livrés jusqu’à chez vous.',
      largestParcel: '220 x 33 x 24 cm', maxWeight: '32kg',
      note: 'Prévoyez de l’aide si nécessaire.', checksTitle: 'Les points à vérifier',
      checks: [
        { id: 'door', illustration: 'door', title: 'Porte', text: 'Vérifiez la largeur la hauteur de passage' },
        { id: 'elevator', illustration: 'elevator', title: 'Ascenseur', text: 'Vérifiez les dimensions intérieures et l’ouverture des portes' },
        { id: 'stairs', illustration: 'stairs', title: 'Escaliers', text: 'Assurez-vous de disposer d’assez d’espace, surtout dans les virages et sur les paliers' },
      ],
    },
    space: {
      title: 'Avez-vous assez de place ?',
      intro: 'Vérifiez que le meuble rentre à l’endroit prévu, en gardant suffisamment d’espace pour circuler. Mesurez la zone libre prévue pour le meuble.',
      // Figma shows the bed upright: length 213cm, width 111cm.
      footprint: { width: 111, depth: 213 }, illustration: 'bed', itemLabel: 'Ce lit',
    },
    assembly: {
      title: 'Préparez le montage', intro: 'L’essentiel pour vous organiser avant l’arrivée de votre meuble.',
      stats: [
        { id: 'duration', icon: 'clock', value: '1h30', label: 'Durée', demo: true },
        { id: 'people', icon: 'users', value: '2 personnes', label: 'Recommandées', demo: true },
        { id: 'difficulty', icon: 'wrench', value: 'Facile', label: 'Difficulté', demo: true },
      ],
      manual: { href: '/assets/notice-prototype.html', label: 'Consulter la notice de montage' },
      service: { title: 'Besoin d’un coup de main ?', text: 'Un service de montage est proposé avec certaines options de livraison.', href: '#livraison', linkLabel: 'Voir les options de livraison' },
    },
  },
}
