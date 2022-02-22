
/* 本例子中的联系人contact的结构如下：
    {
        number: '13100001234',
        name: '小明',
        city: '北京'
    }
*/
let Phone = android.provider.ContactsContract.CommonDataKinds.Phone;
let ContentValues = android.content.ContentValues;
let ContentUris = android.content.ContentUris;
let ContactsContract = android.provider.ContactsContract;

alert("警告", "将会请求联系人权限。为了保证自己的通讯录不被其他脚本泄漏或破坏，请运行本脚本后手动禁止读写联系人权限。")
// 请求联系人权限
runtime.requestPermissions(["read_contacts", "write_contacts"]);

// insertOrUpdateContact({
//     number: '662377009',
//     name: 'Auto.js Pro',
//     city: '上海'
// });

// 首次运行会出错，因为读写联系人权限还没授予，很正常
log(getAllContacts());

// 根据联系人号码删除联系人
function deleteContact(contact) {
    let contactId = queryContactId(contact.number);
    console.log("删除联系人: id = %s, 内容 = ", contactId, contact);
    if (contactId === undefined) {
        console.warn("失败: 联系人不存在");
        return false;
    }
    context.contentResolver.delete(ContactsContract.Data.CONTENT_URI,
        ContactsContract.Data.RAW_CONTACT_ID + " = " + contactId, null);
    context.contentResolver.delete(ContactsContract.RawContacts.CONTENT_URI,
        "_id = " + contactId, null);
    console.log("成功");
    return true;
}

// 插入或更新联系人
function insertOrUpdateContact(contact) {
    let contactId = queryContactId(contact.number);
    if (contactId === undefined) {
        contactId = insertRawContact();
    }
    console.log("插入联系人: id = %s, 内容 = ", contactId, contact);
    insertContactData(contactId, ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE,
        ContactsContract.CommonDataKinds.StructuredName.GIVEN_NAME, contact.name);
    insertContactData(contactId, ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE,
        ContactsContract.CommonDataKinds.StructuredPostal.CITY, contact.city);
    insertContactData(contactId, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
        ContactsContract.CommonDataKinds.Phone.NUMBER, contact.number,
        ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE
    );
    console.log("成功");
    return contactId;
}

// 根据号码查询联系人的ID
function queryContactId(number) {
    let cursor = context.contentResolver.query(ContactsContract.Data.CONTENT_URI, null, ContactsContract.CommonDataKinds.Phone.NUMBER + " = '" + number + "' AND "
        + ContactsContract.Data.MIMETYPE + " = '" + ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE + "'", null, null);
    if (cursor.moveToFirst()) {
        return cursor.getLong(cursor.getColumnIndex(ContactsContract.Data.RAW_CONTACT_ID));
    }
    return undefined;
}

function insertRawContact() {
    let values = new ContentValues();
    let rawContactUri = context.contentResolver.insert(ContactsContract.RawContacts.CONTENT_URI, values);
    let contactId = ContentUris.parseId(rawContactUri);
    return contactId;
}

function insertContactData(rawContactId, itemType) {
    let values = new ContentValues()
    with (values) {
        put(ContactsContract.Data.RAW_CONTACT_ID, new java.lang.Long(rawContactId));
        put(ContactsContract.Data.MIMETYPE, itemType);
        for (let i = 2; i < arguments.length; i += 2) {
            let key = arguments[i];
            let value = arguments[i + 1];
            if (typeof (value) == 'number') {
                put(key, new java.lang.Long(value));
            } else {
                put(key, value);
            }
        }
    }
    context.contentResolver.insert(ContactsContract.Data.CONTENT_URI, values)
}

// 获取所有联系人
function getAllContacts() {
    let contacts = [];
    let cursor = context.contentResolver.query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);
    while (cursor.moveToNext()) {
        let contact = {};
        contact.name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
        let contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
        contact.contactId = contactId;
        //contact.rawContactId = cursor.getLong(cursor.getColumnIndex(ContactsContract.Data.RAW_CONTACT_ID));
        let phones = context.contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null,
            ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId, null, null);
        if (phones.moveToFirst()) {
            contact.number = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
        }
        phones.close()
        contacts.push(contact);
    }
    cursor.close()
    return contacts;
}