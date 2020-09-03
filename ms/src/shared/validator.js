/* eslint-disable no-unused-vars */
'use strict'

import validator from 'fluent-validator'

module.exports = {

    validateMail: (mail) => {
        const validation = validator()
            .validate(mail.subject).isNotNull().and.isNotEmpty()
            .validate(mail.body).isNotNull().and.isNotEmpty()
            .validate(mail.from).isNotNull().and.isNotEmpty().and.isEmail()
            .validate(mail.to).isNotEmpty().and.isNotEmpty()
    
        return validation
    },

    validateMessage: (message) => {
        const validation = validator()
            .validate(message.from).isNotNull().and.isNotEmpty().and.isMongoObjectId()
            .validate(message.to).isNotNull().and.isNotEmpty().and.isMongoObjectId()
            .validate(message.message).isNotNull().and.isNotEmpty()
            .validate(message.replyto).isNull().or.isMongoObjectId()
    
        return validation
    },

    validateBid: (bid) => {
        const validation = validator()
            .validate(bid.user).isNotEmpty().and.isMongoObjectId()
            .validate(bid.task).isNotEmpty().and.isMongoObjectId()
            .validate(bid.amount).isNumber().isPositive()
    
        return validation
    },
    
    validateTask: (task) => {
        const validation = validator()
            .validate(task.title).isNotEmpty()
            .validate(task.description).isNotEmpty()
            .validate(task.rate).isNotNull()
            .validate(task.rate.amount).isNumber().and.isPositive()
            .validate(task.location).isNotNull()
            .validate(task.location.street).isNotEmpty()
            .validate(task.location.city).isNotEmpty()
            .validate(task.location.state).isNotEmpty()
            .validate(task.location.zipcode).isNotEmpty()
            .validate(task.location.country).isNotEmpty()
    
        return validation
    },

    validateUser: (user) => {
        const validation = validator()
            .validate(user.username).isNotEmpty().and.isEmail()
            .validate(user.name).isNotNull()
            .validate(user.address.street).isNotNull()
            .validate(user.address.city).isNotNull()//.and.isCity()
            .validate(user.address.state).isNotNull()//.and.isProvince()
            .validate(user.address.zipcode).isNotNull().and.matches('^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]')
            .validate(user.address.country).isNotNull()//.and.isCountry()
    
        return validation
    },
    
    validateClient: (user) => {
        const validation = module.exports.validateUser(user)
        validation
            .validate(user.username).isNotEmpty().and.isEmail()
    
        return validation
    },
    
    validateVendor: (user) => {
        let validation = this.validateUser(user)
        validation
            .validate(user.roles).isNotNull().and.passes(value => Array.isArray(value) && value.length >= 1, 'roles not array!')
            .validate(user.skill_summary).isNotNull()
            .validate(user.work_cities).passes(value => Array.isArray(value), 'cities not array!')
            .validate(user.email).isNotNull().and.isEmail()
            .validate(user.social).isNull().or.passes(value => Array.isArray(value), 'social not array!')
            .validate(user.vehicles).isNull().or.passes(value => Array.isArray(value), 'vehicles not array!')
            .validate(user.jobdone_photos).isNull().or.passes(value => Array.isArray(value), 'jobphotos not array!')
    
        return validation
    },
    
    validateCredential: (user) => {
        const validation = validator()
            .validate(user.username).isNotEmpty().and.isEmail()
            .validate(user.password).isNotEmpty()
    
        return validation
    },

    validateCard: (card) => {
        const validation = validator()
            .validate(card.cardno).isNotEmpty()
    
        return validation
    },

    validateReview: (review) => {
        const validatetion = validator()
            .validate(review.comment).isNotEmpty()

        return validatetion
    },

    extend: (validator) => {
        // custom validators
        validator.add('isCountry', 'Value is not a country', (country) => {
            return ['Canada', 'United States'].includes(country)
        })

        validator.add('isCity', 'Value is not a country', (city) => {
            return ['Calgary', 'Edmonton', 'Montreal', 'Winnipeg', 'Toronto', 'Regina', 'Sasktoon'].includes(city)
        })

        validator.add('isProvince', 'Value is not a country', (province) => {
            return ['AB', 'ON', 'QC', 'BC'].includes(province)
        })

        return validator
    }

}