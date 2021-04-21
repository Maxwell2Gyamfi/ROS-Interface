/****************************************************************************
** Meta object code from reading C++ file 'camera_display.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.9.5)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../../../src/iiwa_stack/rviz_camera_stream/include/rviz_camera_stream/camera_display.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'camera_display.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.9.5. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_rviz__CameraPub_t {
    QByteArrayData data[11];
    char stringdata0[173];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_rviz__CameraPub_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_rviz__CameraPub_t qt_meta_stringdata_rviz__CameraPub = {
    {
QT_MOC_LITERAL(0, 0, 15), // "rviz::CameraPub"
QT_MOC_LITERAL(1, 16, 11), // "forceRender"
QT_MOC_LITERAL(2, 28, 0), // ""
QT_MOC_LITERAL(3, 29, 11), // "updateAlpha"
QT_MOC_LITERAL(4, 41, 11), // "updateTopic"
QT_MOC_LITERAL(5, 53, 15), // "updateQueueSize"
QT_MOC_LITERAL(6, 69, 15), // "updateFrameRate"
QT_MOC_LITERAL(7, 85, 21), // "updateBackgroundColor"
QT_MOC_LITERAL(8, 107, 22), // "updateDisplayNamespace"
QT_MOC_LITERAL(9, 130, 19), // "updateImageEncoding"
QT_MOC_LITERAL(10, 150, 22) // "updateNearClipDistance"

    },
    "rviz::CameraPub\0forceRender\0\0updateAlpha\0"
    "updateTopic\0updateQueueSize\0updateFrameRate\0"
    "updateBackgroundColor\0updateDisplayNamespace\0"
    "updateImageEncoding\0updateNearClipDistance"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_rviz__CameraPub[] = {

 // content:
       7,       // revision
       0,       // classname
       0,    0, // classinfo
       9,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags
       1,    0,   59,    2, 0x08 /* Private */,
       3,    0,   60,    2, 0x08 /* Private */,
       4,    0,   61,    2, 0x08 /* Private */,
       5,    0,   62,    2, 0x08 /* Private */,
       6,    0,   63,    2, 0x08 /* Private */,
       7,    0,   64,    2, 0x08 /* Private */,
       8,    0,   65,    2, 0x08 /* Private */,
       9,    0,   66,    2, 0x08 /* Private */,
      10,    0,   67,    2, 0x08 /* Private */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,

       0        // eod
};

void rviz::CameraPub::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        CameraPub *_t = static_cast<CameraPub *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->forceRender(); break;
        case 1: _t->updateAlpha(); break;
        case 2: _t->updateTopic(); break;
        case 3: _t->updateQueueSize(); break;
        case 4: _t->updateFrameRate(); break;
        case 5: _t->updateBackgroundColor(); break;
        case 6: _t->updateDisplayNamespace(); break;
        case 7: _t->updateImageEncoding(); break;
        case 8: _t->updateNearClipDistance(); break;
        default: ;
        }
    }
    Q_UNUSED(_a);
}

const QMetaObject rviz::CameraPub::staticMetaObject = {
    { &Display::staticMetaObject, qt_meta_stringdata_rviz__CameraPub.data,
      qt_meta_data_rviz__CameraPub,  qt_static_metacall, nullptr, nullptr}
};


const QMetaObject *rviz::CameraPub::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *rviz::CameraPub::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_rviz__CameraPub.stringdata0))
        return static_cast<void*>(this);
    if (!strcmp(_clname, "Ogre::RenderTargetListener"))
        return static_cast< Ogre::RenderTargetListener*>(this);
    return Display::qt_metacast(_clname);
}

int rviz::CameraPub::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = Display::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 9)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 9;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 9)
            *reinterpret_cast<int*>(_a[0]) = -1;
        _id -= 9;
    }
    return _id;
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
