import {MigrationInterface, QueryRunner} from "typeorm";

export class MockPosts1626869526742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into post (title, text, "creatorId", "createdAt") values ('Saturday Night Fever', 'Profit-focused stable intranet', 1, '2020-09-29T19:10:27Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Learning Tree', 'Focused maximized groupware', 1, '2020-09-29T03:42:18Z');
        insert into post (title, text, "creatorId", "createdAt") values ('You Only Live Once', 'Pre-emptive interactive moratorium', 1, '2020-09-13T22:15:33Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Iron Will', 'Multi-tiered needs-based strategy', 1, '2021-06-19T22:52:26Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Bat*21', 'Distributed zero tolerance contingency', 1, '2021-07-19T02:36:23Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Flodder in Amerika!', 'Enterprise-wide bandwidth-monitored portal', 1, '2021-03-17T22:06:33Z');
        insert into post (title, text, "creatorId", "createdAt") values ('High Tech, Low Life', 'Polarised fault-tolerant circuit', 1, '2021-05-25T06:39:44Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Luster', 'Seamless composite artificial intelligence', 1, '2020-10-15T06:49:27Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Mr. Freedom', 'Centralized well-modulated frame', 1, '2020-08-26T04:13:40Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Date Night', 'Multi-tiered modular firmware', 1, '2021-03-02T03:59:15Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Birth of the Living Dead', 'Monitored system-worthy forecast', 1, '2021-01-06T12:55:02Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Empire of the Sun', 'Enterprise-wide mobile superstructure', 1, '2021-06-16T04:44:06Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Boyhood', 'Mandatory modular application', 1, '2021-05-21T00:00:47Z');
        insert into post (title, text, "creatorId", "createdAt") values ('That Day, on the Beach (Hai tan de yi tian)', 'Team-oriented attitude-oriented installation', 1, '2020-08-02T05:05:22Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Keys of the Kingdom, The', 'Fully-configurable 5th generation protocol', 1, '2020-12-31T04:17:13Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cirque du Soleil: Varekai', 'Mandatory executive functionalities', 1, '2020-12-07T02:17:40Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Oranges, The', 'Front-line next generation encoding', 1, '2021-05-19T23:29:55Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Law Abiding Citizen', 'Extended empowering help-desk', 1, '2021-02-09T01:01:26Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Oliver & Company', 'Total coherent attitude', 1, '2021-06-20T16:49:33Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Godzilla vs. Destroyah (Gojira vs. Desutoroiâ) ', 'Customizable incremental standardization', 1, '2020-12-29T17:58:38Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Spacehunter: Adventures in the Forbidden Zone', 'Persevering leading edge infrastructure', 1, '2020-12-18T17:40:35Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Snow Queen', 'Inverse heuristic utilisation', 1, '2020-11-12T08:07:32Z');
        insert into post (title, text, "creatorId", "createdAt") values ('That Certain Woman', 'Open-source tangible approach', 1, '2020-07-31T13:47:29Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Sword in the Stone, The', 'Enterprise-wide reciprocal strategy', 1, '2020-08-11T11:35:48Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Witches of Eastwick, The', 'Compatible analyzing encryption', 1, '2021-07-01T20:35:43Z');
        insert into post (title, text, "creatorId", "createdAt") values ('In the Beginning (À l''Origine)', 'Decentralized radical array', 1, '2020-08-10T02:30:23Z');
        insert into post (title, text, "creatorId", "createdAt") values ('True Confession', 'Adaptive intermediate encryption', 1, '2021-01-12T05:32:15Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Widow From Chicago', 'Centralized radical hub', 1, '2020-12-03T19:34:25Z');
        insert into post (title, text, "creatorId", "createdAt") values ('51', 'Future-proofed optimal methodology', 1, '2021-02-07T14:52:50Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Liquid Sky', 'Digitized client-driven internet solution', 1, '2021-05-30T20:57:49Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Ice Princess', 'Distributed didactic encoding', 1, '2021-07-04T04:22:16Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Kiss of the Spider Woman', 'Advanced reciprocal strategy', 1, '2021-03-13T13:19:28Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Simpatico', 'Synergized asymmetric structure', 1, '2021-03-13T06:29:51Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Gothika', 'Up-sized eco-centric policy', 1, '2021-01-05T07:33:36Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Starcrash (a.k.a. Star Crash)', 'Optimized modular solution', 1, '2020-09-04T00:04:38Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Care Bears Movie II: A New Generation', 'Fully-configurable attitude-oriented capacity', 1, '2020-09-23T16:31:40Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Devil Is a Woman, The', 'Pre-emptive fault-tolerant capacity', 1, '2020-09-09T00:41:43Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Chronicles of Narnia: The Voyage of the Dawn Treader, The', 'Pre-emptive zero administration ability', 1, '2020-08-24T12:24:00Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Bloody New Year', 'Ergonomic multimedia neural-net', 1, '2020-12-27T09:19:26Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Tattoo', 'Inverse background artificial intelligence', 1, '2020-10-08T20:59:50Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cosmonaut, The', 'Multi-tiered 5th generation emulation', 1, '2021-05-31T10:05:45Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Terror of Mechagodzilla (Mekagojira no gyakushu)', 'Synergistic dynamic hardware', 1, '2020-10-14T22:10:40Z');
        insert into post (title, text, "creatorId", "createdAt") values ('God Save the King', 'Self-enabling local info-mediaries', 1, '2021-05-31T23:45:39Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Bloodsuckers', 'Exclusive bi-directional structure', 1, '2021-07-08T17:03:36Z');
        insert into post (title, text, "creatorId", "createdAt") values ('We Are What We Are', 'Business-focused encompassing infrastructure', 1, '2020-10-16T13:33:49Z');
        insert into post (title, text, "creatorId", "createdAt") values ('In Your Dreams (Dans tes rêves)', 'Streamlined logistical standardization', 1, '2021-03-31T02:57:37Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Twice Upon a Yesterday (a.k.a. Man with Rain in His Shoes, The)', 'Networked analyzing product', 1, '2021-01-25T01:47:58Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Tiger from Tjampa, The (Harimau Tjampa)', 'Inverse dedicated infrastructure', 1, '2021-01-04T06:30:10Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Love and Other Drugs', 'Versatile clear-thinking paradigm', 1, '2020-08-02T05:51:50Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Yentl', 'Pre-emptive 5th generation framework', 1, '2020-10-28T00:57:58Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Days of Glory (Indigènes)', 'Reduced heuristic application', 1, '2020-10-24T15:47:59Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Super Troopers', 'Organized contextually-based forecast', 1, '2020-10-12T16:24:40Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cannonball Run, The', 'Organized needs-based function', 1, '2020-10-16T21:52:23Z');
        insert into post (title, text, "creatorId", "createdAt") values ('All In: The Poker Movie', 'Enhanced multi-tasking throughput', 1, '2020-11-21T12:04:57Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Big Bang, The', 'Public-key system-worthy strategy', 1, '2020-09-18T21:19:19Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Uncommon Making of Petulia', 'Compatible motivating emulation', 1, '2021-01-07T18:55:56Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Training Day', 'Networked systemic functionalities', 1, '2020-07-21T10:29:06Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Dr. Goldfoot and the Girl Bombs (Le spie vengono dal semifreddo)', 'Synergistic regional parallelism', 1, '2020-10-06T05:49:36Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Strawberry Statement, The', 'Horizontal explicit success', 1, '2021-05-01T07:21:55Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cool as Ice', 'Proactive incremental strategy', 1, '2021-07-18T00:29:11Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Dust', 'Advanced real-time conglomeration', 1, '2021-01-19T20:24:37Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Farmer''s Daughter, The', 'Expanded hybrid moderator', 1, '2020-08-26T21:30:14Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Lucky Lady', 'Organic grid-enabled definition', 1, '2021-06-12T07:50:15Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Secret Honor', 'Optimized contextually-based conglomeration', 1, '2021-04-06T19:12:52Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Killers', 'Horizontal zero tolerance migration', 1, '2021-07-11T04:29:25Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Transformers: Age of Extinction', 'Synchronised value-added matrices', 1, '2021-06-05T20:23:48Z');
        insert into post (title, text, "creatorId", "createdAt") values ('California Dreamin'' (Nesfarsit)', 'Cross-group impactful superstructure', 1, '2020-09-04T01:07:02Z');
        insert into post (title, text, "creatorId", "createdAt") values ('City Slickers II: The Legend of Curly''s Gold', 'Inverse bifurcated service-desk', 1, '2021-02-12T22:23:33Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Mala Noche', 'Synchronised solution-oriented task-force', 1, '2020-07-30T07:30:59Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Next Best Thing, The', 'Monitored 4th generation interface', 1, '2021-04-15T18:21:27Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Hotel Reserve', 'Open-source context-sensitive capability', 1, '2021-05-13T16:16:53Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Cape No. 7 (Hái-kak chhit-ho)', 'Triple-buffered next generation parallelism', 1, '2020-07-26T16:34:00Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Diamond Arm, The (Brilliantovaya ruka)', 'Synergistic upward-trending knowledge base', 1, '2020-11-24T14:10:09Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Pygmalion', 'Organized 3rd generation middleware', 1, '2020-12-02T12:05:30Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Blade: Trinity', 'Versatile intangible moderator', 1, '2020-10-23T17:59:18Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Night the Lights Went Out in Georgia, The', 'User-centric discrete standardization', 1, '2021-05-11T11:02:22Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Separation City', 'Configurable tertiary forecast', 1, '2020-12-16T11:26:57Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Wrestler, The (Painija)', 'Business-focused eco-centric adapter', 1, '2020-12-20T18:54:42Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Three Comrades', 'Cloned tangible methodology', 1, '2021-07-13T07:55:00Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Vampire Journals', 'Grass-roots actuating pricing structure', 1, '2020-09-17T03:40:52Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Somebody Up There Likes Me', 'Decentralized executive encoding', 1, '2020-10-29T13:11:28Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Glory', 'Visionary reciprocal local area network', 1, '2021-05-28T07:36:36Z');
        insert into post (title, text, "creatorId", "createdAt") values ('The Secret of Convict Lake', 'Proactive interactive throughput', 1, '2021-06-13T07:11:32Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Drive Thru', 'Ameliorated system-worthy groupware', 1, '2020-10-31T20:10:18Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Lady in Cement', 'Stand-alone intangible parallelism', 1, '2021-07-09T05:23:59Z');
        insert into post (title, text, "creatorId", "createdAt") values ('First Strike', 'Synchronised upward-trending structure', 1, '2021-04-10T05:50:16Z');
        insert into post (title, text, "creatorId", "createdAt") values ('My Favorite Season', 'Monitored interactive time-frame', 1, '2021-03-01T08:23:59Z');
        insert into post (title, text, "creatorId", "createdAt") values ('My Way Home (Így jöttem) ', 'Up-sized directional help-desk', 1, '2021-07-11T07:26:23Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Inbetweeners Movie, The', 'Synchronised well-modulated definition', 1, '2020-08-27T02:05:48Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Just My Luck', 'Profit-focused empowering Graphical User Interface', 1, '2021-01-15T02:50:56Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Miami Rhapsody', 'Switchable methodical function', 1, '2020-10-25T05:28:15Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Gladiator', 'Implemented content-based toolset', 1, '2021-02-08T14:58:19Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Seven Alone', 'Synergistic zero administration firmware', 1, '2020-12-06T10:11:14Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Alibi, The (Lies and Alibis)', 'Cross-platform even-keeled extranet', 1, '2021-01-12T06:25:19Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Body and Soul', 'Quality-focused incremental hardware', 1, '2021-02-16T06:31:26Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Beautiful Boxer', 'Mandatory scalable service-desk', 1, '2020-11-29T01:03:37Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Big Chill, The', 'Grass-roots regional benchmark', 1, '2021-07-07T18:53:41Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Don 2', 'Up-sized explicit open architecture', 1, '2021-05-10T05:58:53Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Underworld: Evolution', 'Fully-configurable optimizing superstructure', 1, '2020-08-08T12:49:41Z');
        insert into post (title, text, "creatorId", "createdAt") values ('Rage of Angels', 'Self-enabling intermediate instruction set', 1, '2021-01-12T07:43:27Z');
        `)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
