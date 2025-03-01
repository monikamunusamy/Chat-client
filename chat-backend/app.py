from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample messages for channels
messages = {
    1: [{'text': 'Hello there!', 'sender': 'User1'}],
    2: [{'text': 'Need help!', 'sender': 'User2'}],
}

MAX_MESSAGES = 100  # Limit the number of messages

@app.route('/channels', methods=['GET'])
def get_channels():
    channels = [
        {'id': 1, 'name': 'General Chat'},
        {'id': 2, 'name': 'Tech Support'},
        {'id': 3, 'name': 'Announcements'},
    ]
    return jsonify(channels)

@app.route('/messages/<int:channel_id>', methods=['GET'])
def get_messages(channel_id):
    # Return messages for the specified channel
    return jsonify(messages.get(channel_id, []))  # Return messages specific to channel_id

@app.route('/messages/<int:channel_id>', methods=['POST'])
def post_message(channel_id):
    message = request.json.get('message')
    if message:
        if channel_id in messages:
            if len(messages[channel_id]) >= MAX_MESSAGES:
                messages[channel_id].pop(0)  # Remove the oldest message if limit reached
            messages[channel_id].append({'text': message, 'sender': 'User3'})  # Change sender as needed
            return jsonify({'status': 'Message sent!'}), 201
        return jsonify({'error': 'Channel not found!'}), 404
    return jsonify({'error': 'Message cannot be empty!'}), 400

if __name__ == '__main__':
    app.run(debug=True)