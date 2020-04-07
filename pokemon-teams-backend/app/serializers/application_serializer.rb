# I made this base class to include some default serializer behavior

class ApplicationSerializer

    # Don't include timestamps at all in serialization
    def self.except_defaults
        [:created_at, :updated_at]
    end

end
