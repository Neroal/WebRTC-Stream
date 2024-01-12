'use strict';

class SrsRtcWhipWhepAsync {

    constructor() {
        this.pc = new RTCPeerConnection(null);
        this.stream = new MediaStream();

        this.pc.ontrack = (event) => {
            this.ontrack && this.ontrack(event);
        }
    }

    async play(url) {
        if (url.indexOf('/whip-play/') === -1 && url.indexOf('/whep/') === -1) throw new Error(`invalid WHEP url ${url}`);

        this.pc.addTransceiver("audio", { direction: "recvonly" });
        this.pc.addTransceiver("video", { direction: "recvonly" });

        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer)

        const answer = await new Promise((resolve, reject) => {
            console.log('Generated Offer:', offer);

            const xhr = new XMLHttpRequest();

            xhr.onload = () => {
                if (xhr.readyState !== xhr.DONE) return;
                if (xhr.status !== 200 && xhr.status !== 201) return reject(xhr);

                const data = xhr.responseText;
                console.log('Get answer:', data);
                return data.code ? reject(xhr) : resolve(data);
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/sdp');
            xhr.send(offer.sdp);
        })

        this.pc.setRemoteDescription(
            new RTCSessionDescription({ type: 'answer', sdp: answer })
        )
    }

    ontrack(event) {
        this.stream.addTrack(event.track);
    }
}

