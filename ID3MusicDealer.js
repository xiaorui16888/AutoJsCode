'use strict';

(function() {
    var ID3module = {
            name: 'ID3module',
            version: '1.0.0',
            author: '77',
            email: '2069284231@qq.com'
        },
        ID3v2 = {
            name: 'ID3v2',
            readFrameData: {}
        };
    var stringUtils = {
        readUTF16String: function(bytes, bBigEndian) {
            var ix = 0,
                offset1 = 1,
                offset2 = 0,
                bytesLength = bytes.length,
                bigEndian = bBigEndian;
            if (bytes[0] == 0xFE && bytes[1] == 0xFF) {
                bigEndian = true;
                ix = 2;
            } else if (bytes[0] == 0xFF && bytes[1] == 0xFE) {
                bigEndian = false;
                ix = 2;
            }


            if (bigEndian) {
                offset1 = 0;
                offset2 = 1;
            }

            var arr = [];

            while (ix < bytesLength) {
                var byte1 = bytes[ix + offset1],
                    byte2 = bytes[ix + offset2],

                    word1 = (byte1 << 8) + byte2;
                ix += 2;

                if (word1 == 0x0000) {
                    break;
                } else if (byte1 < 0xD8 || byte1 > 0xDF) {
                    arr.push(String.fromCharCode(word1));
                } else {
                    var byte3 = bytes[ix + offset1],
                        byte4 = bytes[ix + offset2],
                        word2 = (byte3 << 8) + byte4;

                    ix += 2;
                    arr.push(String.fromCharCode(word1, word2));
                }
            }

            var string = new String(arr.join(""));
            string.bytesReadCount = ix;
            return string;
        },
        readUTF8String: function(bytes) {
            var ix = 0,
                bytesLength = bytes.length;

            if (bytes[0] == 0xEF && bytes[1] == 0XBB && bytes[2] == 0xBF) {
                ix = 3;
            }

            var arr = [];

            while (ix < bytesLength) {
                var byte1 = bytes[ix++];
                if (byte1 == 0x00) {
                    break;
                } else if (byte1 < 0x80) {
                    arr.push(String.fromCharCode(byte1));
                } else if (byte1 >= 0xC2 && byte1 < 0xE0) {
                    var byte2 = bytes[ix++];
                    arr.push(String.fromCharCode(((byte1 & 0x1F) << 6) + (byte2 & 0x3F)));
                } else if (byte1 >= 0xE0 && byte1 < 0xF0) {
                    var byte2 = bytes[ix++],
                        byte3 = bytes[ix++];
                    arr.push(String.fromCharCode(((byte1 & 0xFF) << 12) + ((byte2 & 0x3F) << 6) + (byte3 & 0x3F)));
                }
            }
            var string = new String(arr.join(""));
            string.bytesReadCount = ix;
            return string;
        },
        readNullTerminatedString: function(bytes) {
            var arr = [],
                bytesLength = bytes.length,
                i;
            for (i = 0; i < bytesLength;) {
                var byte1 = bytes[i++];
                if (byte1 == 0x00) break;
                arr.push(String.fromCharCode(byte1));
            }
            var string = new String(arr.join(""));
            string.bytesReadCount = i;
            return string;
        }
    };

    ID3module.stringUtils = stringUtils;

    var binaryFile = function(strData) {
        var data = strData,
            dataOffset = 0,
            dataLength = strData.length;

        this.getRawData = function() {
            return data;
        };

        this.getDataArr = function() {
            return this.getBytesAt(0, dataLength);
        }

        this.getByteAt = function(iOffset) {
            return data.charCodeAt(iOffset + dataOffset) & 0xFF;
        };

        this.getBytesAt = function(iOffset, iLength) {
            var bytes = [];
            for (var i = 0; i < iLength; i++) {
                bytes.push(this.getByteAt(iOffset + i));
            }
            return bytes;
        };

        this.getLength = function() {
            return dataLength;
        };


        this.isBitSetAt = function(iOffset, iBit) {
            var iByte = this.getByteAt(iOffset);
            return (iByte >> iBit & 1) == 1;
        };

        this.getShortAt = function(iOffset, bBigEndian) {
            var iShort = bBigEndian ?
                (this.getByteAt(iOffset) << 8) + this.getByteAt(iOffset + 1) : (this.getByteAt(iOffset + 1) << 8) + this.getByteAt(iOffset);
            if (iShort < 0) iShort += 65536;
            return iShort;
        };

        this.getLongAt = function(iOffset, bBigEndian) {
            var iByte1 = this.getByteAt(iOffset),
                iByte2 = this.getByteAt(iOffset + 1),
                iByte3 = this.getByteAt(iOffset + 2),
                iByte4 = this.getByteAt(iOffset + 3);

            var iLong = bBigEndian ?
                (((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8) + iByte4 : (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8) + iByte1;
            if (iLong < 0) iLong += 4294967296;
            return iLong;
        };

        this.getStringAt = function(iOffset, iLength) {
            var aStr = [];
            for (var i = iOffset; i < iOffset + iLength; i++) {
                aStr.push(String.fromCharCode(this.getByteAt(i)));
            }
            return aStr.join("");
        };

        this.getStringWidthCharsetAt = function(iOffset, iLength, iCharset) {
            var bytes = this.getBytesAt(iOffset, iLength),
                sString;

            switch (iCharset.toLowerCase()) {
                case 'utf-16':
                case 'utf-16le':
                case 'utf-16be':
                    sString = ID3module.stringUtils.readUTF16String(bytes);
                    break;

                case 'utf-8':
                    sString = ID3module.stringUtils.readUTF8String(bytes);
                    break;

                default:
                    sString = ID3module.stringUtils.readNullTerminatedString(bytes);
                    break;
            }

            return sString;
        };



        this.getCharAt = function(iOffset) {
            return String.fromCharCode(this.getByteAt(iOffset));
        }

        this.toBase64 = function(iOffset, iLength) {
            var offset = iOffset || 0,
                length = iLength || data.length;
            return ID3module.b64Utils.btoa(data.getStringAt(offset, length));
        };

        this.fromBase64 = function(strBase64) {
            data = ID3module.b64Utils.atob(strBase64);
        };
    };

    ID3module.BinaryFile = binaryFile;

    var b64Utils = {
        atob: function(data) {
            return window.atob(data);
        },
        btoa: function(data) {
            return window.btoa(data);
        }
    };

    ID3module.b64Utils = b64Utils;

    var fileAPIReader = function(file, opt_reader) {
        return function(fncCallback, fncError) {
            var reader = opt_reader || new FileReader();
            reader.onload = function(event) {
                var result = event.target.result;
                fncCallback(new binaryFile(result));
            };
            reader.onerror = fncError;
            reader.readAsBinaryString(file);
        };
    };

    ID3module.fileAPIReader = fileAPIReader;

    ID3module.framesTable = {
        // v2.3
        "AENC": "Audio encryption",
        "APIC": "Attached picture",
        "COMM": "Comments",
        "COMR": "Commercial frame",
        "ENCR": "Encryption method registration",
        "EQUA": "Equalization",
        "ETCO": "Event timing codes",
        "GEOB": "General encapsulated object",
        "GRID": "Group identification registration",
        "IPLS": "Involved people list",
        "LINK": "Linked information",
        "MCDI": "Music CD identifier",
        "MLLT": "MPEG location lookup table",
        "OWNE": "Ownership frame",
        "PRIV": "Private frame",
        "PCNT": "Play counter",
        "POPM": "Popularimeter",
        "POSS": "Position synchronisation frame",
        "RBUF": "Recommended buffer size",
        "RVAD": "Relative volume adjustment",
        "RVRB": "Reverb",
        "SYLT": "Synchronized lyric/text",
        "SYTC": "Synchronized tempo codes",
        "TALB": "Album/Movie/Show title",
        "TBPM": "BPM (beats per minute)",
        "TCOM": "Composer",
        "TCON": "Content type",
        "TCOP": "Copyright message",
        "TDAT": "Date",
        "TDLY": "Playlist delay",
        "TENC": "Encoded by",
        "TEXT": "Lyricist/Text writer",
        "TFLT": "File type",
        "TIME": "Time",
        "TIT1": "Content group description",
        "TIT2": "Title/songname/content description",
        "TIT3": "Subtitle/Description refinement",
        "TKEY": "Initial key",
        "TLAN": "Language(s)",
        "TLEN": "Length",
        "TMED": "Media type",
        "TOAL": "Original album/movie/show title",
        "TOFN": "Original filename",
        "TOLY": "Original lyricist(s)/text writer(s)",
        "TOPE": "Original artist(s)/performer(s)",
        "TORY": "Original release year",
        "TOWN": "File owner/licensee",
        "TPE1": "Lead performer(s)/Soloist(s)",
        "TPE2": "Band/orchestra/accompaniment",
        "TPE3": "Conductor/performer refinement",
        "TPE4": "Interpreted, remixed, or otherwise modified by",
        "TPOS": "Part of a set",
        "TPUB": "Publisher",
        "TRCK": "Track number/Position in set",
        "TRDA": "Recording dates",
        "TRSN": "Internet radio station name",
        "TRSO": "Internet radio station owner",
        "TSIZ": "Size",
        "TSRC": "ISRC (international standard recording code)",
        "TSSE": "Software/Hardware and settings used for encoding",
        "TYER": "Year",
        "TXXX": "User defined text information frame",
        "UFID": "Unique file identifier",
        "USER": "Terms of use",
        "USLT": "Unsychronized lyric/text transcription",
        "WCOM": "Commercial information",
        "WCOP": "Copyright/Legal information",
        "WOAF": "Official audio file webpage",
        "WOAR": "Official artist/performer webpage",
        "WOAS": "Official audio source webpage",
        "WORS": "Official internet radio station homepage",
        "WPAY": "Payment",
        "WPUB": "Publishers official webpage",
        "WXXX": "User defined URL link frame"
    };

    ID3module._shortcuts = {
        "title": ["TIT2"],
        "artist": ["TPE1"],
        "album": ["TALB"],
        "year": ["TYER"],
        "comment": ["COMM"],
        "track": ["TRCK"],
        "genre": ["TCON"],
        "picture": ["APIC"],
        "lyrics": ["USLT"]
    };

    ID3module._defaultShortcuts = ["title", "artist"];

    ID3module.getFrameData = function(frames, ids) {
        if (typeof ids == "string") {
            ids = [id3];
        }

        for (var i = 0, id; id = ids[i]; i++) {
            if (id in frames) {
                return frames[id].data;
            }
        }
    }

    ID3v2.readTagsFromData = function(data, tags) {
        var offset = 0,
            major = data.getByteAt(offset + 3),
            revision = data.getByteAt(offset + 4),
            unsynch = data.isBitSetAt(offset + 5, 7),
            xheader = data.isBitSetAt(offset + 5, 6),
            xtest = data.isBitSetAt(offset + 5, 5),
            size = this.readSynchsafeInteger32At(data, offset + 6);

        offset += 10;
        if (xheader) {
            var xheadersize = data.getLongAt(offset, true);
            offset += xheadersize + 4;
        }

        var id3 = {
            "version": '2.' + major + '.' + revision,
            "major": major,
            "flags": {
                "unsynchronisation": unsynch,
                "extended_header": xheader,
                "experimental_indicator": xtest
            },
            "size": size
        };
        
        var frames = unsynch ? {} : this.readFrames(offset, size - 10, data, id3, tags);

        for (var name in ID3module._shortcuts) {
            if (ID3module._shortcuts.hasOwnProperty(name)) {
                var data = ID3module.getFrameData(frames, ID3module._shortcuts[name]);
                if (data) id3[name] = data;
            }
        }

        for (var frame in frames) {
            if (frames.hasOwnProperty(frame)) {
                id3[frame] = frames[frame];
            }
        }

        return id3;

    };

    ID3v2.readSynchsafeInteger32At = function(data, offset) {
        var size1 = data.getByteAt(offset),
            size2 = data.getByteAt(offset + 1),
            size3 = data.getByteAt(offset + 2),
            size4 = data.getByteAt(offset + 3);

        var size = size4 & 0x7f | ((size3 & 0x7f) << 7) | ((size2 & 0x7f) << 14) | ((size1 & 0x7f) << 21);

        return size;
    };

    ID3v2.readFrames = function(offset, end, data, id3header, tags) {

        var major = id3header["major"],
            tags = this.getTagsFromShortcuts(tags || this._defaultShortcuts),
            readFrameFunc = undefined,
            frames = {};

        while (offset < end) {
            var frameData = data,
                frameDataOffset = offset;
            switch (major) {
                case 3:
                    var frameID = frameData.getStringAt(frameDataOffset, 4),
                        framesize = frameData.getLongAt(frameDataOffset + 4, true),
                        frameHeaderSize = 10;
                    break;
            }

            if (frameID == "") break;

            offset += frameHeaderSize + framesize;
            if (tags.indexOf(frameID) < 0) continue;

            //flag over
            frameDataOffset += frameHeaderSize;

            if (frameID in ID3v2.readFrameData) {
                readFrameFunc = ID3v2.readFrameData[frameID];
            } else if (frameID[0] == "T") {
                readFrameFunc = ID3v2.readFrameData["T*"];
            }


            var parsedData = readFrameFunc ? readFrameFunc(frameDataOffset, framesize, frameData) : undefined,
                desc = frameID in ID3module.framesTable ? ID3module.framesTable[frameID] : "Unkown";

            var frame = {
                id: frameID,
                size: framesize,
                description: desc,
                data: parsedData
            };

            frames[frameID] = frame;

        }
        return frames;
    };

    ID3v2.getTagsFromShortcuts = function(shortcuts) {
        var tags = [];
        for (var i = 0, shortcut; shortcut = shortcuts[i]; i++) {
            tags = tags.concat(ID3module._shortcuts[shortcut] || [shortcut]);
        }
        return tags;
    };

    ID3v2.getTextEncoding = function(iByte) {
        var charset;
        switch (iByte) {
            case 0x00:
                charset = 'iso-8859-1';
                break;

            case 0x01:
                charset = 'utf-16';
                break;

            case 0x02:
                charset = 'utf-16be';
                break;

            case 0x03:
                charset = 'utf-8';
                break;
        }
        return charset;
    };

    ID3v2.readFrameData['COMM'] = function(offset, length, data) {
        var start = offset,
            charset = ID3v2.getTextEncoding(data.getByteAt(offset)),
            language = data.getStringAt(offset + 1, 3),
            shortdesc = data.getStringWidthCharsetAt(offset + 4, length - 4, charset);

        offset += 4 + shortdesc.bytesReadCount;

        var text = data.getStringWidthCharsetAt(offset, (start + length) - offset, charset);

        return {
            language: language,
            short_description: shortdesc.toString(),
            text: text.toString()
        };
    };

    ID3v2.readFrameData['T*'] = function(offset, length, data) {
        var charset = ID3v2.getTextEncoding(data.getByteAt(offset));
        return data.getStringWidthCharsetAt(offset + 1, length - 1, charset).toString();
    };

    ID3v2.readFrameData['APIC'] = function(offset, length, data, v) {
        v = v || '3';
        var start = offset,
            charset = ID3v2.getTextEncoding(data.getByteAt(offset));

        switch (v) {
            case '2':
                break;
            case '3':
                var format = data.getStringWidthCharsetAt(offset + 1, length, '');
                offset += 1 + format.bytesReadCount;
                break;
        }

        var bite = data.getByteAt(offset),
            type = ID3v2.pictureType[bite],
            desc = data.getStringWidthCharsetAt(offset + 1, length - (offset - start), charset);
        offset += 1 + desc.bytesReadCount;

        return {
            "format": format.toString(),
            "type": type,
            "description": desc.toString(),
            "data": data.getBytesAt(offset, (start + length) - offset)
        };
    };

    ID3v2.pictureType = [
        "32x32 pixels 'file icon' (PNG only)",
        "Other file icon",
        "Cover (front)",
        "Cover (back)",
        "Leaflet page",
        "Media (e.g. lable side of CD)",
        "Lead artist/lead performer/soloist",
        "Artist/performer",
        "Conductor",
        "Band/Orchestra",
        "Composer",
        "Lyricist/text writer",
        "Recording Location",
        "During recording",
        "During performance",
        "Movie/video screen capture",
        "A bright coloured fish",
        "Illustration",
        "Band/artist logotype",
        "Publisher/Studio logotype"
    ];
    window['ID3module'] = ID3module;
    window['ID3v2'] = ID3v2;
})();