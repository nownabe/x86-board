# frozen_string_literal: true

require "base64"
require "json"
require "open3"
require "tempfile"
require "sinatra/base"

FailedToAssemble = Class.new(StandardError)

class Server < Sinatra::Base
  after do
    cache_control :no_cache
  end

  get "/" do
    html "index.html"
  end

  post "/assemble" do
    begin
      code = JSON.parse(request.body.read)["code"]
      encoded = assemble(code)
      {
        success: true,
        encoded: encoded
      }.to_json
    rescue => e
      $stderr.puts e.class
      $stderr.puts e.message
      $stderr.puts e.backtrace
      status 500
      {
        success: false,
        error_class: e.class,
        error_message: e.message
      }.to_json
    end
  end

  private

  def assemble(code)
    Tempfile.open(["emu", "code"]) do |sf|
      sf.sync = true
      sf.write(code)
      Tempfile.open(["emu", "binary"], nil, mode: File::Constants::RDONLY | File::Constants::BINARY) do |bf|
        _, e, s = Open3.capture3("nasm -o #{bf.path} #{sf.path}")
        raise(FailedToAssemble, e) unless s.success?
        Base64.encode64(bf.read)
      end
    end
  end
end
