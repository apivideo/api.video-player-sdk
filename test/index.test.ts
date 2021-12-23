import { expect } from 'chai';
import { PlayerSdk } from '../index';


describe('Instanciation', () => {

    beforeEach(() => {
        window.document.body.innerHTML = "";
    });

    it('throws if dom target is not found', () => {
        expect(() => new PlayerSdk("#target")).to.throw("No match found for selector #target");
    });


    it('creates an iframe if the target is not an iframe', () => {
        const target = createAndAppendChild("div", "target");

        const sdk = new PlayerSdk("#target", { id: "123" });

        expect(target.children.length).to.be.eq(1);
        expect(target.children[0]).to.instanceOf(HTMLIFrameElement);
    });


    it('instanciation with an element', () => {
        const target = createAndAppendChild("div", "target");

        const sdk = new PlayerSdk(target, { id: "123" });

        expect(target.children.length).to.be.eq(1);
        expect(target.children[0]).to.instanceOf(HTMLIFrameElement);
    });



    it('keep the target as-is if it is an iframe', () => {
        const target = createAndAppendChild("iframe", "target");

        const sdk = new PlayerSdk("#target", { id: "123" });

        expect(target.children.length).to.be.eq(0);
    });


    it('throws if no video id is given', () => {
        createAndAppendChild("iframe", "target");

        expect(() => new PlayerSdk("#target")).to.throw("Missing id in options");
    });


    it('throws if no video id is given', () => {
        const liveIframe = createAndAppendChild("iframe", "targetLive") as HTMLIFrameElement;
        const vodIframe = createAndAppendChild("iframe", "targetVod") as HTMLIFrameElement;

        const sdkLive = new PlayerSdk("#targetLive", { id: "liveId", live: true });
        const sdkVod = new PlayerSdk("#targetVod", { id: "vodId" });

        expect(liveIframe.src).to.match(/https:\/\/embed\.api\.video\/live\/liveId\?id=liveId&live=true&ts=[0-9]+#api;sdkOrigin:[A-Za-z0-9=]+;sdkPlayerId:[0-9]+/);
        expect(vodIframe.src).to.match(/https:\/\/embed\.api\.video\/vod\/vodId\?id=vodId&ts=[0-9]+#api;sdkOrigin:[A-Za-z0-9=]+;sdkPlayerId:[0-9]+/);
    });


    it('bind to existing iframe if the iframe already has a src', () => {
        const iframe = createAndAppendChild("iframe", "target") as HTMLIFrameElement;
        iframe.src = "https://src";

        const sdk = new PlayerSdk("#target", { id: "123" });

        expect(iframe.src).to.match(/https:\/\/src\/#api;sdkOrigin:[A-Za-z0-9=]+;sdkPlayerId:[0-9]+/);
    });


    it('url fragment option are added', () => {
        const iframe = createAndAppendChild("iframe", "target") as HTMLIFrameElement;

        const sdk = new PlayerSdk("#target", { id: "123", hideControls: true, loop: true });

        expect(iframe.src).to.match(/[^#]+#loop;hide-controls;.*/);
    });

    const createAndAppendChild = (tagName: string, id: string): HTMLElement => {
        const elt = document.createElement(tagName);
        elt.id = id;
        document.body.appendChild(elt);
        return elt;
    }
});