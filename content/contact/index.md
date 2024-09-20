---
title: "Contact Page"
summary: "How to contact me"
type: landing

sections:
  - block: contact
    id: contact
    content:
      title: Contact
      subtitle: ''
      text: ''
      # Contact details - edit or remove options as needed
      email: romellid@tcd.ie
      address:
        street: Department of Economics, Arts Building, Trinity College Dublin
        city: Dublin
        region: Co. Dublin
        postcode: 'D02 PN40'
        country: Ireland
        country_code: IE
      contact_links:
        - icon: twitter
          icon_pack: fab
          name: DM Me
          link: 'https://twitter.com/DavideRomelli'
      # Automatically link email and phone or display them just as text?
      autolink: true
      # Choose an email form provider (netlify/formspree)
      form:
        provider: netlify
        formspree:
          # If using Formspree, enter your Formspree form ID
          id: ''
        netlify:
          # Enable CAPTCHA challenge to reduce spam?
          captcha: false
      # Coordinates to display a map - set your map provider in `params.yaml`
      coordinates:
        latitude: '53.3432'
        longitude: '6.2571'
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
---
