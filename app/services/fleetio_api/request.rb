class FleetioApi::Request
  BASE_URL = "https://secure.fleetio.com/api/v1/".freeze

  def self.get_request(endpoint, query = {})
    HTTParty.get(build_url(endpoint), {
      headers: headers,
      query: query,
    })
  end

private

  def self.build_url(endpoint)
    "#{BASE_URL}#{endpoint}"
  end

  def self.headers
    {
      "Authorization" => "Token #{ENV['FLEETIO_AUTH_TOKEN']}",
      "Account-Token" => ENV['FLEETIO_ACCOUNT_TOKEN']
    }
  end
end
