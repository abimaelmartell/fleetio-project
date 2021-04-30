# Fleetio Sample Project

This app runs on Ruby 3.0.1 and Rails 6.1.3.

## Configuration

The configuration for API credentials is stored on ENV variables, you can use the .env.example as a template for setting those variables.

## Styling

The styling is very basic, so i just used SASS which was already included with Rails. For icons i pulled a few icons from FontAwesome SVG Repository.

## Dependencies

### API

For the API i added two dependencies

- `httparty` For dealing with the API calls to Fleetio API
- `delayed_job_active_record` As backend for the Async task of calculating the fuel efficiency


### UI

For the UI i added three dependencies:

- `react-redux` I decided to handle the state with redux
- `@reduxjs/toolkit` This reduces the boilerplate code of having redux reducer, actions and store
- `react-router-dom` This is handling the routing on the UI

### Testing

For testing i'm using `rspec` with `shoulda-matchers` to avoid some boilerplate.
