export function getKeepTimeSart(record, index) {
    switch (index) {
        case 10:
            return record.TimeKeepStart1;
        case 11:
            return record.TimeKeepStart2;
        case 12:
            return record.TimeKeepStart3;
        case 13:
            if (record.TimeKeepStart6 != '') {
                return record.TimeKeepStart6;
            } else {
                return record.TimeKeepStart4;
            }
    }
    return '';
}

export function getKeepTimeEnd(record, index) {
    switch (index) {
        case 10:
            return record.TimeKeepEnd1;
        case 11:
            return record.TimeKeepEnd2;
        case 12:
            return record.TimeKeepEnd3;
        case 13:
            if (record.TimeKeepEnd6 != '') {
                return record.TimeKeepEnd6;
            } else {
                return record.TimeKeepEnd4;
            }
    }
    return '';
}

export function convertTimeToMinutes(time) {
    if (time == 0) { return 0; }
    let substrings = time.split(":");

    return parseInt(substrings[0]) * 60 + parseInt(substrings[1]);
}

export function getRootFromTree(list, node) {
    
    const arr = {
        Organize: '',
        Department: ''
    }
    if (node == null) return arr;
    if (node == '') return arr;


    list.map((e) => {
        if (e.PostID.trim() == node.trim()) {
            arr.Organize = e.organize,
                arr.Department = e.departmentName
            return arr;
        }
    });

    return arr;
}



